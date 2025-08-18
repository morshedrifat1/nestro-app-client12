import React from 'react';

const Privacy = () => {
    return (
     <div className='p-5'>
        <div className="text-base text-base-300 p-5 max-w-[1420px] mx-auto bg-boxbg my-5 rounded-lg">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm mb-8">Last updated: August 18, 2025</p>

      <section className="space-y-6">
        <p>
          <strong>Nestro</strong> ("we", "us") values your privacy. This page explains how we
          collect, use, and protect your information when you use our online platform where people
          can hold conversations in the form of posted messages.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
          <p>
            We may collect account details (such as your email and username), profile information,
            content you post, messages you share, and technical data such as IP address, browser
            type, and device information. This helps us ensure a safe and reliable service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
          <p>
            We use the data to operate and improve Nestro, personalize your experience, provide
            customer support, ensure security, and send important updates about the service. We may
            also use aggregated data to analyze trends and improve platform performance.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Data Sharing & Disclosure</h2>
          <p>
            Public posts are visible to other users. We do not sell your personal data. However, we
            may share limited information with trusted service providers, business partners, or if
            required by law to comply with legal obligations or protect user safety.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Cookies & Tracking</h2>
          <p>
            Nestro uses cookies and similar technologies to keep you signed in, remember your
            preferences, and analyze site activity. You can manage or disable cookies in your
            browser settings, but this may affect how the platform functions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Data Security & Retention</h2>
          <p>
            We take reasonable steps to protect your data through encryption and secure storage. We
            keep your personal information only as long as it is needed for the purposes described
            in this policy, unless a longer retention period is required by law.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your data. Depending on your location,
            you may also have rights to restrict or object to processing. Contact us to exercise
            these rights, and we will respond as required by applicable law.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Children&apos;s Privacy</h2>
          <p>
            Nestro is not intended for use by children under the age of 13. We do not knowingly
            collect data from minors. If you believe a child has provided us with personal
            information, please contact us so we can remove it.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If significant changes are made,
            we will notify users by posting an update on this page or via email.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at
            <strong> contact@nestro.com</strong>.
          </p>
        </div>

        <hr className="my-6" />
        <p className="text-sm">
          This Privacy Policy is provided for transparency and general information. It does not
          constitute legal advice. Please review it carefully and contact us if you need further
          clarification.
        </p>
      </section>
    </div>
     </div>
  );
};

export default Privacy;