import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Route {
  id: string;
  user_id: string;
  name: string;
  origin_address: string;
  destination_address: string;
  check_time: string[];
  check_days: number[];
  is_active: boolean;
}

interface UserSettings {
  google_maps_api_key: string | null;
  timezone: string | null;
  trial_started_at: string | null;
  has_lifetime_access: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get current time info
    const now = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    console.log(`[check-commutes] Running at ${now.toISOString()}`);

    // Fetch all active routes
    const { data: routes, error: routesError } = await supabase
      .from("routes")
      .select("*")
      .eq("is_active", true);

    if (routesError) {
      console.error("[check-commutes] Error fetching routes:", routesError);
      throw routesError;
    }

    if (!routes || routes.length === 0) {
      console.log("[check-commutes] No active routes found");
      return new Response(JSON.stringify({ message: "No active routes", checked: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[check-commutes] Found ${routes.length} active routes`);

    // Get the project-level Google Maps API key
    const googleMapsApiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");
    if (!googleMapsApiKey) {
      console.error("[check-commutes] GOOGLE_MAPS_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Google Maps API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let checkedCount = 0;
    const results: { routeId: string; success: boolean; message: string }[] = [];

    for (const route of routes as Route[]) {
      // Get user's settings for timezone and subscription status
      const { data: settings } = await supabase
        .from("user_settings")
        .select("timezone, trial_started_at, has_lifetime_access")
        .eq("user_id", route.user_id)
        .maybeSingle();

      const timezone = settings?.timezone || "America/Los_Angeles";

      // Check subscription status - skip if trial expired and not paid
      if (settings) {
        const hasLifetimeAccess = settings.has_lifetime_access || false;
        const trialStartedAt = settings.trial_started_at ? new Date(settings.trial_started_at) : null;
        
        if (!hasLifetimeAccess && trialStartedAt) {
          const trialEndDate = new Date(trialStartedAt);
          trialEndDate.setDate(trialEndDate.getDate() + 1); // 1 day trial
          
          if (now > trialEndDate) {
            console.log(`[check-commutes] Route ${route.id} - skipping, user trial expired and not paid`);
            results.push({ routeId: route.id, success: false, message: "Trial expired" });
            continue;
          }
        }
      }

      if (!settings) {
        console.log(`[check-commutes] Route ${route.id} - no user settings, using default timezone`);
      }

      // Get current time in user's timezone
      const userNow = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
      const userDayOfWeek = userNow.getDay(); // Day in USER's timezone
      const currentHour = userNow.getHours();
      const currentMinute = userNow.getMinutes();
      const currentTimeStr = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
      
      console.log(`[check-commutes] Route ${route.id} - user timezone: ${timezone}, day: ${userDayOfWeek} (${dayNames[userDayOfWeek]}), time: ${currentTimeStr}`);

      // Check if today is a check day for this route (using user's timezone day)
      if (!route.check_days || !route.check_days.includes(userDayOfWeek)) {
        console.log(`[check-commutes] Route ${route.id} - skipping, not a check day (user day: ${userDayOfWeek})`);
        continue;
      }

      // Check each configured check time
      const checkTimes = route.check_time || [];
      let matchedTime: string | null = null;

      for (const checkTime of checkTimes) {
        const checkTimeParts = checkTime.split(":");
        const checkHour = parseInt(checkTimeParts[0]);
        const checkMinute = parseInt(checkTimeParts[1]);
        const checkTimeStr = `${checkHour.toString().padStart(2, "0")}:${checkMinute.toString().padStart(2, "0")}`;

        if (currentTimeStr === checkTimeStr) {
          matchedTime = checkTimeStr;
          break;
        }
      }

      if (!matchedTime) {
        console.log(`[check-commutes] Route ${route.id} - skipping, not check time (current: ${currentTimeStr}, times: ${checkTimes.join(", ")})`);
        continue;
      }

      // Check if we already logged for this route at this specific time today
      const todayStart = new Date(userNow);
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date(userNow);
      todayEnd.setHours(23, 59, 59, 999);

      const { data: existingLogs } = await supabase
        .from("commute_logs")
        .select("id, checked_at")
        .eq("route_id", route.id)
        .gte("checked_at", todayStart.toISOString())
        .lte("checked_at", todayEnd.toISOString());

      // Check if we already have a log for this specific time
      const alreadyLoggedThisTime = existingLogs?.some(log => {
        const logTime = new Date(log.checked_at);
        const logHour = logTime.getHours().toString().padStart(2, "0");
        const logMinute = logTime.getMinutes().toString().padStart(2, "0");
        return `${logHour}:${logMinute}` === matchedTime;
      });

      if (alreadyLoggedThisTime) {
        console.log(`[check-commutes] Route ${route.id} - skipping, already checked at ${matchedTime} today`);
        continue;
      }

      console.log(`[check-commutes] Route ${route.id} - checking commute from "${route.origin_address}" to "${route.destination_address}"`);

      // Call Google Maps Directions API
      try {
        const origin = encodeURIComponent(route.origin_address);
        const destination = encodeURIComponent(route.destination_address);
        const departureTime = Math.floor(Date.now() / 1000); // Current timestamp

        const mapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=${departureTime}&key=${googleMapsApiKey}`;

        const mapsResponse = await fetch(mapsUrl);
        const mapsData = await mapsResponse.json();

        if (mapsData.status !== "OK") {
          console.error(`[check-commutes] Route ${route.id} - Google Maps API error:`, mapsData.status, mapsData.error_message);
          results.push({ routeId: route.id, success: false, message: `Maps API: ${mapsData.status}` });
          continue;
        }

        const route_data = mapsData.routes[0];
        const leg = route_data.legs[0];

        // Duration in seconds
        const durationSeconds = leg.duration.value;
        const durationInTrafficSeconds = leg.duration_in_traffic?.value || durationSeconds;

        // Convert to minutes
        const durationMinutes = Math.round(durationSeconds / 60);
        const durationInTrafficMinutes = Math.round(durationInTrafficSeconds / 60);

        console.log(`[check-commutes] Route ${route.id} - Duration: ${durationMinutes}min, In traffic: ${durationInTrafficMinutes}min`);

        // Insert commute log
        const { error: insertError } = await supabase
          .from("commute_logs")
          .insert({
            route_id: route.id,
            duration_minutes: durationMinutes,
            duration_in_traffic_minutes: durationInTrafficMinutes,
            day_of_week: dayNames[userDayOfWeek],
            checked_at: now.toISOString(),
          });

        if (insertError) {
          console.error(`[check-commutes] Route ${route.id} - Error inserting log:`, insertError);
          results.push({ routeId: route.id, success: false, message: "Insert failed" });
        } else {
          checkedCount++;
          results.push({ routeId: route.id, success: true, message: `${durationInTrafficMinutes}min` });
          console.log(`[check-commutes] Route ${route.id} - Successfully logged`);
        }
      } catch (mapsError) {
        console.error(`[check-commutes] Route ${route.id} - Error calling Maps API:`, mapsError);
        results.push({ routeId: route.id, success: false, message: "API call failed" });
      }
    }

    console.log(`[check-commutes] Completed. Checked ${checkedCount} routes.`);

    return new Response(
      JSON.stringify({ message: "Commute check complete", checked: checkedCount, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[check-commutes] Unexpected error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
