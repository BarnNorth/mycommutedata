import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, TrendingUp, Zap, Target, AlertCircle, Car, Calendar } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">MyCommuteData</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get <span className="text-primary">exact</span> commute times, not ranges
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Other map tools show ranges when forecasting future drive times. We record <strong>actual</strong> commute
              times automatically, so you can see real historical data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Zap className="w-4 h-4" />
                  Start Tracking Free
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">See the Difference</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Other map tools give you vague ranges. We give you real data.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Google Maps Side */}
            <div className="rounded-xl overflow-hidden border border-destructive/30 bg-card shadow-lg">
              <div className="bg-destructive/10 px-4 py-3 border-b border-destructive/20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <span className="font-medium text-destructive text-sm">Other Map Tools</span>
                </div>
              </div>
              <div className="p-6">
                {/* Mockup of Google Maps interface */}
                <div className="bg-background rounded-lg border border-border/50 p-4 mb-4 min-h-[220px]">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3 pb-3 border-b border-border/30">
                    <Clock className="w-4 h-4" />
                    <span>Depart at 8:00 AM</span>
                    <span className="mx-2">•</span>
                    <Calendar className="w-4 h-4" />
                    <span>Mon, Jan 12</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground mb-1">via I-805 N</p>
                      <p className="text-destructive font-semibold">typically 22 min to 35 min</p>
                      <p className="text-sm text-muted-foreground">Arrive around 8:35 AM • 16.9 miles</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground mb-1">via I-5 N</p>
                      <p className="text-destructive font-semibold">typically 26 min to 40 min</p>
                      <p className="text-sm text-muted-foreground">Arrive around 8:40 AM • 20.6 miles</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-destructive mb-1">"typically 30 min to 1 hr"</p>
                  <p className="text-sm text-muted-foreground">A 30-minute range doesn't help you plan</p>
                </div>
              </div>
            </div>

            {/* MyCommuteData Side */}
            <div className="rounded-xl overflow-hidden border border-primary/30 bg-card shadow-lg">
              <div className="bg-primary/10 px-4 py-3 border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary text-sm">MyCommuteData</span>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-muted/50 rounded-lg border border-border/50 p-4 mb-4 min-h-[220px]">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Mon, Jan 6 @ 8:00 AM</span>
                      <span className="font-semibold text-foreground">42 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Tue, Jan 7 @ 8:00 AM</span>
                      <span className="font-semibold text-foreground">38 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Wed, Jan 8 @ 8:00 AM</span>
                      <span className="font-semibold text-foreground">45 min</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">Thu, Jan 9 @ 8:00 AM</span>
                      <span className="font-semibold text-foreground">36 min</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary mb-1">Exact times, every day</p>
                  <p className="text-sm text-muted-foreground">Real data to make real decisions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={<MapPin className="w-6 h-6" />}
              title="Add Your Routes"
              description="Enter your home and work addresses. Set the exact time you leave each day."
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="We Record Daily"
              description="Every day at your scheduled time, we capture the exact traffic duration—not a range."
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="See Real Patterns"
              description="View your commute history to find the fastest days and times based on real data."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stop Guessing. Start Knowing.</h2>
            <p className="text-muted-foreground mb-8">
              Join commuters who finally have accurate data on their drive times.
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg">Create Free Account</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MyCommuteData. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-card shadow-card border border-border/50 animate-slide-up">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
