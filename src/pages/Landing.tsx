import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Animated Road Lines Background */}
      <div className="fixed inset-0 road-lines opacity-30 pointer-events-none" />

      {/* Floating Logo - Top Left */}
      <Link to="/" className="fixed top-6 left-6 z-50 flex items-center gap-2 animate-float">
        <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center text-xl shadow-orange">
          🚗
        </div>
        <span className="font-bold text-lg hidden sm:block">CommutesDontSuck</span>
      </Link>

      {/* Floating Nav - Top Right */}
      <nav className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-card/80 backdrop-blur-md rounded-full px-4 py-2 border border-border">
        <Link to="/auth">
          <Button variant="ghost" size="sm" className="rounded-full">
            Log in
          </Button>
        </Link>
        <Link to="/auth?mode=signup">
          <Button size="sm" className="rounded-full gradient-orange border-0">
            Sign up
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left Side - Headlines */}
            <div className="animate-fade-in">
              <h1 className="text-hero mb-6">
                Make your commute not{" "}
                <span className="text-primary italic relative">
                  <span className="relative">
                    suck
                    <span className="absolute left-0 right-0 top-1/2 h-1 bg-accent -rotate-2" />
                  </span>
                </span>
              </h1>
              <p className="text-hero-sub text-muted-foreground mb-8 max-w-xl">
                Other map apps give you vague ranges like "25-45 min." We track your actual commute times so you can
                stop guessing and start planning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth?mode=signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl gradient-orange border-0 shadow-orange hover:scale-105 transition-transform duration-300"
                  >
                    Track My Commute (It's Free) 🚗
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Comparison Cards */}
            <div className="flex flex-col gap-4 animate-slide-up max-w-xs">
              {/* Other Map Tools Card */}
              <div className="bg-card border border-destructive/30 rounded-xl overflow-hidden transform -rotate-1 hover-lift text-sm">
                <div className="bg-destructive/10 px-3 py-2 border-b border-destructive/20">
                  <span className="text-destructive text-xs font-medium">❌ Other Map Tools</span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-2 pb-2 border-b border-border/30">
                    Depart at 8:00 AM • Mon, Jan 12
                  </div>
                  <div className="space-y-2 mb-3">
                    <div>
                      <p className="font-medium text-sm mb-0.5">via I-805 N</p>
                      <p className="text-destructive font-semibold text-sm">typically 22 min to 35 min</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm mb-0.5">via I-5 N</p>
                      <p className="text-destructive font-semibold text-sm">typically 26 min to 40 min</p>
                    </div>
                  </div>
                  <div className="text-center pt-3 border-t border-border/30">
                    <p className="font-semibold text-destructive text-sm">"typically" does not help</p>
                    <p className="text-xs text-muted-foreground">A range doesn't help you plan</p>
                  </div>
                </div>
              </div>

              {/* CommutesDontSuck Card */}
              <div className="bg-card border-2 border-accent rounded-xl overflow-hidden transform rotate-2 shadow-teal hover-lift text-sm">
                <div className="bg-accent/10 px-3 py-2 border-b border-accent/20">
                  <span className="text-accent text-xs font-medium">✅ CommutesDontSuck</span>
                </div>
                <div className="p-4">
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-xs text-muted-foreground">Mon, Jan 6 @ 8:00 AM</span>
                      <span className="font-semibold text-sm">42 min</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-xs text-muted-foreground">Tue, Jan 7 @ 8:00 AM</span>
                      <span className="font-semibold text-sm">38 min</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-xs text-muted-foreground">Wed, Jan 8 @ 8:00 AM</span>
                      <span className="font-semibold text-sm">45 min</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-xs text-muted-foreground">Thu, Jan 9 @ 8:00 AM</span>
                      <span className="font-semibold text-sm">36 min</span>
                    </div>
                  </div>
                  <div className="text-center pt-3 border-t border-border/30">
                    <p className="font-semibold text-accent text-sm">Exact times, every day</p>
                    <p className="text-xs text-muted-foreground">Real data to make real decisions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Skewed */}
      <section className="py-24 gradient-orange skew-section">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-foreground">
            Why do you need this?
          </h2>
          <p className="text-center text-primary-foreground/80 mb-16 text-lg">
            (or at least, not telling the full truth)
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ProblemCard
              emoji="🏠"
              title="House Hunting"
              description="You're comparing neighborhoods but have no idea what rush hour actually looks like on that route."
            />
            <ProblemCard
              emoji="💼"
              title="New Job Offer"
              description="They say '30 minute commute' but you suspect that's wildly optimistic for 8am traffic."
            />
            <ProblemCard
              emoji="⏰"
              title="Flexible Schedule"
              description="You can choose your hours but don't know which times actually have lighter traffic."
            />
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How it works</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Set it up once, get insights forever</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Large Card - 2x2 */}
            <div className="md:col-span-2 md:row-span-2 bg-card border border-border rounded-2xl p-8 hover-lift hover:border-primary transition-colors">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Set Your Routes</h3>
              <p className="text-muted-foreground text-lg">
                Add your home, work, gym, daycare—wherever you drive. Pick the times you actually leave. We'll handle
                the rest.
              </p>
            </div>

            {/* Wide Card - 2x1 */}
            <div className="md:col-span-2 bg-card border border-border rounded-2xl p-6 hover-lift hover:border-primary transition-colors">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">We Check Automatically</h3>
              <p className="text-muted-foreground">
                Every day at your scheduled times, we capture the exact traffic duration. No manual logging needed.
              </p>
            </div>

            {/* 1x1 Cards */}
            <div className="bg-card border border-border rounded-2xl p-6 hover-lift hover:border-primary transition-colors">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">See Patterns</h3>
              <p className="text-muted-foreground text-sm">Discover which days and times are actually fastest.</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover-lift hover:border-primary transition-colors">
              <div className="text-4xl mb-4">😊</div>
              <h3 className="text-xl font-bold mb-2">Visual Ratings</h3>
              <p className="text-muted-foreground text-sm">
                Emoji indicators so you know at a glance if traffic sucks.
              </p>
            </div>

            {/* Wide Card - 2x1 */}
            <div className="md:col-span-2 bg-card border border-border rounded-2xl p-6 hover-lift hover:border-primary transition-colors">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">Historical Data</h3>
              <p className="text-muted-foreground">
                Build up weeks and months of real data. Export to CSV anytime. Your data, your way.
              </p>
            </div>

            {/* 1x1 Card */}
            <div className="md:col-span-2 lg:col-span-1 bg-card border border-border rounded-2xl p-6 hover-lift hover:border-primary transition-colors">
              <div className="text-4xl mb-4">🚦</div>
              <h3 className="text-xl font-bold mb-2">Real Numbers</h3>
              <p className="text-muted-foreground text-sm">No more "typically." Just facts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Showcase Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">The kind of insights you'll get</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Real data from real commutes</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl mx-auto">
            {/* Best Time Card */}
            <div className="bg-card border-2 border-success rounded-2xl p-8 transform -rotate-2 -translate-y-5 hover-lift w-full md:w-72">
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Best Time</p>
              <p className="text-5xl font-black text-success mb-2">28m 😊</p>
              <p className="text-muted-foreground text-sm">Wednesday at 7:30am is your sweet spot</p>
            </div>

            {/* Average Card */}
            <div className="bg-card border-2 border-warning rounded-2xl p-8 transform translate-y-5 hover-lift w-full md:w-72">
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Average</p>
              <p className="text-5xl font-black text-warning mb-2">41m 😐</p>
              <p className="text-muted-foreground text-sm">Your typical commute experience</p>
            </div>

            {/* Worst Time Card */}
            <div className="bg-card border-2 border-destructive rounded-2xl p-8 transform rotate-2 -translate-y-2.5 hover-lift w-full md:w-72">
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Worst Time</p>
              <p className="text-5xl font-black text-destructive mb-2">58m 😤</p>
              <p className="text-muted-foreground text-sm">Monday at 8am. Avoid at all costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Skewed Reverse */}
      <section className="py-24 gradient-teal skew-section-reverse">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent-foreground">
              Stop guessing. Start knowing.
            </h2>
            <p className="text-accent-foreground/80 mb-8 text-lg">
              Join commuters who finally have accurate data on their drive times.
            </p>
            <Link to="/auth?mode=signup">
              <Button
                size="lg"
                className="text-lg px-10 py-6 rounded-2xl bg-background text-accent hover:bg-background/90 hover:scale-105 transition-all duration-300"
              >
                Hell yeah, track my commute 🚗
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} CommutesDontSuck · Made for people who are tired of "typically"
          </p>
        </div>
      </footer>
    </div>
  );
}

function ProblemCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary-foreground/20">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold mb-2 text-primary-foreground">{title}</h3>
      <p className="text-primary-foreground/80">{description}</p>
    </div>
  );
}
