import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to home</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using CommutesDontSuck ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground">
              CommutesDontSuck is a commute tracking service that records traffic duration data for routes you specify at scheduled times. We use third-party mapping services to collect this data and present it to you in an organized format.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-muted-foreground">
              To use the Service, you must create an account with a valid email address and password. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Free Trial and Payment</h2>
            <p className="text-muted-foreground">
              We offer a 24-hour free trial with full access to all features. After the trial period, continued access requires a one-time payment of $9.99 for lifetime access. All payments are processed securely through Stripe. Payments are non-refundable except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Collection Pause Policy</h2>
            <p className="text-muted-foreground bg-accent/10 p-4 rounded-lg border border-accent/20">
              <strong className="text-foreground">Important:</strong> To manage costs and ensure service sustainability, we automatically pause data collection for each route after 30 days of continuous tracking. When a route is paused, we will no longer collect traffic data for that route until you manually reactivate it. You can reactivate any paused route at any time from your dashboard to resume data collection for another 30-day period. Your historical data is preserved even when a route is paused.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Acceptable Use</h2>
            <p className="text-muted-foreground">You agree not to:</p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated means to access the Service without permission</li>
              <li>Share your account credentials with others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Intellectual Property</h2>
            <p className="text-muted-foreground">
              The Service and its original content, features, and functionality are owned by CommutesDontSuck and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              The Service is provided "as is" without warranties of any kind. We do not guarantee the accuracy of traffic data, as it is sourced from third-party providers. Travel times may vary due to factors beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              CommutesDontSuck shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service, including any decisions made based on the commute data provided.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend your account at any time for violations of these Terms. You may delete your account at any time through the Settings page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the modified Terms. We encourage you to review these Terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about these Terms, please contact us through the Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
