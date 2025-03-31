import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
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
          <h1>Privacy Policy</h1>

          <p className="lead">
            At Medi-Sync, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our platform and services.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Register for an account</li>
            <li>Upload medical records and health information</li>
            <li>Complete your profile</li>
            <li>Participate in health camps</li>
            <li>Use our AI chat or geo-assistance features</li>
            <li>Contact our support team</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name, email address, phone number, and other contact details</li>
            <li>Date of birth, gender, and other demographic information</li>
            <li>Medical history, conditions, allergies, and medications</li>
            <li>Healthcare provider information</li>
            <li>Emergency contact details</li>
            <li>Government-issued identification numbers (such as Aadhaar)</li>
          </ul>

          <h3>1.2 Health Information</h3>
          <p>
            As a healthcare platform, we collect and store health-related information that you choose to provide,
            including:
          </p>
          <ul>
            <li>Medical records and test results</li>
            <li>Prescriptions and medication information</li>
            <li>Chronic conditions and allergies</li>
            <li>Vaccination records</li>
            <li>Health metrics (blood pressure, glucose levels, etc.)</li>
          </ul>

          <h3>1.3 Automatically Collected Information</h3>
          <p>
            When you use our platform, we may automatically collect certain information about your device and usage,
            including:
          </p>
          <ul>
            <li>IP address and device identifiers</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Usage patterns and interactions with our platform</li>
            <li>Location information (when you use our geo-assistance features)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing and maintaining our services</li>
            <li>Generating QR codes for emergency medical access</li>
            <li>Personalizing your experience</li>
            <li>Improving our platform and services</li>
            <li>Communicating with you about updates, features, and health camps</li>
            <li>Responding to your inquiries and support requests</li>
            <li>Ensuring the security of our platform</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2>3. How We Share Your Information</h2>
          <p>We may share your information in the following circumstances:</p>

          <h3>3.1 With Healthcare Providers</h3>
          <p>
            When you use our QR code system, authorized healthcare providers can access your medical information in
            emergency situations. You control what information is accessible through your QR code.
          </p>

          <h3>3.2 With Service Providers</h3>
          <p>
            We may share your information with third-party service providers who help us operate our platform, such as
            cloud storage providers, payment processors, and analytics services. These providers are contractually
            obligated to protect your information.
          </p>

          <h3>3.3 With Your Consent</h3>
          <p>We may share your information with third parties when you explicitly consent to such sharing.</p>

          <h3>3.4 For Legal Reasons</h3>
          <p>
            We may disclose your information if required by law, regulation, legal process, or governmental request.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal and health
            information from unauthorized access, disclosure, alteration, or destruction. These measures include:
          </p>
          <ul>
            <li>Encryption of sensitive data at rest and in transit</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular security assessments and audits</li>
            <li>Employee training on data protection</li>
          </ul>
          <p>
            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive
            to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
          </p>

          <h2>5. Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Accessing and reviewing your information</li>
            <li>Correcting inaccurate or incomplete information</li>
            <li>Deleting your information</li>
            <li>Restricting or objecting to certain processing activities</li>
            <li>Requesting a copy of your information in a portable format</li>
            <li>Withdrawing consent for processing based on consent</li>
          </ul>
          <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your information for as long as necessary to provide our services, comply with legal obligations,
            resolve disputes, and enforce our agreements. When we no longer need your information, we will securely
            delete or anonymize it.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Our services are not intended for children under the age of 13. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and believe that your child has provided
            us with personal information, please contact us, and we will take steps to delete such information.
          </p>

          <h2>8. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence.
            These countries may have different data protection laws. We will take appropriate measures to ensure that
            your information remains protected in accordance with this Privacy Policy.
          </p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal
            requirements. We will notify you of any material changes by posting the updated Privacy Policy on our
            website or through other communication channels. We encourage you to review this Privacy Policy
            periodically.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices,
            please contact us at:
          </p>
          <p>
            Email: privacy@medi-sync.com
            <br />
            Address: Medi-Sync Headquarters, 123 Health Street, Medical District, 10001
            <br />
            Phone: +1 (555) 123-4567
          </p>

          <p className="text-muted-foreground mt-8">Last updated: March 21, 2025</p>
        </div>
      </div>
    </div>
  )
}

