import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1>Terms and Conditions</h1>

          <p className="lead">
            Welcome to Medi-Sync. These Terms and Conditions govern your use of the Medi-Sync platform and services. By
            accessing or using our platform, you agree to be bound by these Terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Medi-Sync platform, website, mobile application, or any other services provided by
            Medi-Sync (collectively, the "Services"), you agree to be bound by these Terms and Conditions. If you do not
            agree to all of these Terms, you may not access or use our Services.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            Medi-Sync provides a platform for users to store, manage, and share their medical information through secure
            QR codes and other digital means. Our Services include, but are not limited to:
          </p>
          <ul>
            <li>Storage of medical records and health information</li>
            <li>Generation of QR codes for emergency access to medical information</li>
            <li>Health camp registration and management</li>
            <li>AI-powered health assistance</li>
            <li>Geo-location services for finding nearby healthcare facilities</li>
          </ul>

          <h2>3. User Accounts</h2>
          <p>
            To use certain features of our Services, you must register for an account. You agree to provide accurate,
            current, and complete information during the registration process and to update such information to keep it
            accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your account credentials and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use of your account or any other breach of
            security.
          </p>

          <h2>4. User Content</h2>
          <p>
            Our Services allow you to upload, store, and share content, including but not limited to medical records,
            health information, and personal data ("User Content"). You retain all rights to your User Content, but you
            grant Medi-Sync a non-exclusive, worldwide, royalty-free license to use, copy, process, adapt, and display
            your User Content solely for the purpose of providing and improving our Services.
          </p>
          <p>You represent and warrant that:</p>
          <ul>
            <li>You own or have the necessary rights to your User Content</li>
            <li>Your User Content does not violate the rights of any third party</li>
            <li>Your User Content complies with all applicable laws and regulations</li>
          </ul>

          <h2>5. Privacy</h2>
          <p>
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal
            information. By using our Services, you agree to our collection, use, and sharing of your information as
            described in our Privacy Policy.
          </p>

          <h2>6. Medical Disclaimer</h2>
          <p>
            Medi-Sync is not a healthcare provider, and our Services are not intended to replace professional medical
            advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions
            you may have regarding medical conditions.
          </p>
          <p>
            The AI features provided by Medi-Sync are for informational purposes only and should not be considered
            medical advice. Medi-Sync does not guarantee the accuracy, completeness, or usefulness of any AI-generated
            content.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Medi-Sync shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
          </p>
          <ul>
            <li>Your use or inability to use our Services</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
            <li>Any interruption or cessation of transmission to or from our Services</li>
            <li>Any bugs, viruses, or other harmful code that may be transmitted through our Services</li>
          </ul>

          <h2>8. Changes to Terms</h2>
          <p>
            We may revise these Terms from time to time. The most current version will always be posted on our website.
            By continuing to use our Services after any changes, you accept the revised Terms.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend your access to our Services immediately, without prior notice or liability, for
            any reason, including if you breach these Terms. Upon termination, your right to use our Services will
            immediately cease.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard
            to its conflict of law provisions.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            Email: support@medi-sync.com
            <br />
            Address: Medi-Sync Headquarters, 123 Health Street, Medical District, 10001
          </p>

          <p className="text-muted-foreground mt-8">Last updated: March 21, 2025</p>
        </div>
      </div>
    </div>
  )
}

