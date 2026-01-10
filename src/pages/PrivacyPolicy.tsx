import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground">
              CommutesDontSuck ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our commute tracking service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-2">We collect the following types of information:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li><strong>Account Information:</strong> Email address and password (securely hashed)</li>
              <li><strong>Route Information:</strong> Origin and destination addresses you provide, scheduled check times, and days of the week</li>
              <li><strong>Commute Data:</strong> Traffic duration data collected at your scheduled times</li>
              <li><strong>Payment Information:</strong> Processed securely by Stripe; we do not store your payment card details</li>
              <li><strong>Usage Data:</strong> Basic analytics about how you use the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-2">We use your information to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Provide and maintain the Service</li>
              <li>Collect and display commute time data for your routes</li>
              <li>Process payments and manage your account</li>
              <li>Send important service notifications</li>
              <li>Improve and optimize the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Collection and Retention</h2>
            <p className="text-muted-foreground bg-accent/10 p-4 rounded-lg border border-accent/20">
              <strong className="text-foreground">45-Day Inactivity Policy:</strong> We automatically pause data collection for all your routes if you have not logged into your account for 45 days. This helps us manage service costs while ensuring active users receive uninterrupted service. Simply logging back in will automatically resume data collection for all your active routes. All historical commute data is retained until you delete your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Third-Party Services</h2>
            <p className="text-muted-foreground mb-2">We use the following third-party services:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li><strong>Google Maps Platform:</strong> To obtain traffic and route duration data</li>
              <li><strong>Stripe:</strong> To process payments securely</li>
              <li><strong>Supabase:</strong> To store and manage your data securely</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              Each of these services has their own privacy policies governing their use of data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information. Your data is stored securely with encryption at rest and in transit. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
            <p className="text-muted-foreground mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Export your commute history data</li>
              <li>Pause or reactivate data collection for any route</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Cookies</h2>
            <p className="text-muted-foreground">
              We use essential cookies to maintain your login session and remember your preferences. We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Children's Privacy</h2>
            <p className="text-muted-foreground">
              The Service is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy or your personal data, please contact us through the Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
