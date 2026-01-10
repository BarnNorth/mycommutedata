import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

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
                Planning a move or new job? Other map apps give you vague ranges like "typically 22 min to 35 min" when looking at traffic for future dates. We allow you to track real traffic data over time so you know exactly what you're signing up for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth?mode=signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl gradient-orange border-0 shadow-orange hover:scale-105 transition-transform duration-300"
                  >
                    Start Free 24-Hour Trial 🚗
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Full access for 24 hours. Then just $9.99/month.
              </p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary-foreground">
            Why do you need this?
          </h2>
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

      {/* Features Section - 3 Cards */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 - Add Your Routes */}
            <div className="bg-card border border-border rounded-2xl p-8 hover-lift hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Add Your Routes</h3>
              <p className="text-muted-foreground">
                Enter your home and work addresses. Set the exact time you leave each day.
              </p>
            </div>

            {/* Card 2 - We Record Daily */}
            <div className="bg-card border border-border rounded-2xl p-8 hover-lift hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">We Record Daily</h3>
              <p className="text-muted-foreground">
                Every day at your scheduled time, we capture the exact traffic duration—not a range.
              </p>
            </div>

            {/* Card 3 - See Real Patterns */}
            <div className="bg-card border border-border rounded-2xl p-8 hover-lift hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">See Real Patterns</h3>
              <p className="text-muted-foreground">
                View your commute history to find the fastest days and times based on real data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple, Fair Pricing</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Try everything free for 24 hours, then decide</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-3xl mx-auto">
            {/* Trial Card */}
            <div className="bg-card border-2 border-accent rounded-2xl p-8 hover-lift w-full md:w-80">
              <div className="text-center mb-6">
                <p className="text-sm text-accent uppercase tracking-wide font-medium mb-2">24-Hour Free Trial</p>
                <p className="text-5xl font-black mb-2">$0</p>
                <p className="text-muted-foreground text-sm">No credit card required</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span>Unlimited routes</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span>Real-time traffic tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span>Full feature access</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span>Complete commute history</span>
                </li>
              </ul>
              <p className="text-xs text-center text-muted-foreground mb-4">
                Trial starts when you create your first route
              </p>
              <Link to="/auth?mode=signup" className="block">
                <Button variant="outline" className="w-full rounded-xl py-6 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Pro Subscription Card */}
            <div className="bg-card border-2 border-primary rounded-2xl p-8 hover-lift w-full md:w-80 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Pro Subscription</p>
                <p className="text-5xl font-black text-primary mb-2">$9.99<span className="text-lg text-muted-foreground">/mo</span></p>
                <p className="text-muted-foreground text-sm">Cancel anytime</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="font-medium">Unlimited routes</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span>Real-time traffic tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="font-medium">Full commute history</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span>Cancel anytime</span>
                </li>
              </ul>
              <p className="text-xs text-center text-muted-foreground mb-4">
                No long-term commitment required.
              </p>
              <Link to="/auth?mode=signup" className="block">
                <Button className="w-full rounded-xl py-6 gradient-orange border-0">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data Showcase Section */}
      <section className="py-24">
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
              Try free for 24 hours. Then just $9.99/month.
            </p>
            <Link to="/auth?mode=signup">
              <Button
                size="lg"
                className="text-lg px-10 py-6 rounded-2xl bg-background text-accent hover:bg-background/90 hover:scale-105 transition-all duration-300"
              >
                Start My Free Trial 🚗
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
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
