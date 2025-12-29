import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, TrendingUp, Zap, Target, AlertCircle } from "lucide-react";

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

      {/* Problem/Solution */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/20">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <h3 className="font-semibold text-destructive">The problem with other map tools</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Shows vague ranges like "typically 30 min to 1 hr"</li>
                <li>• Can't check traffic at specific future times</li>
                <li>• No way to track patterns over weeks or months</li>
                <li>• Hard to plan around inconsistent estimates</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-primary">The MyCommuteData solution</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Records exact times: "37 minutes"</li>
                <li>• Checks at your scheduled commute time daily</li>
                <li>• Builds a history to see real patterns</li>
                <li>• Know your actual commute, not a guess</li>
              </ul>
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
