import React from "react";

const RefundPolicy = () => {
  return (
    <div className="px-5">
        <div className="max-w-[1420px] bg-boxbg my-5 rounded-lg mx-auto py-10 px-5 text-base-300">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

      <p className="mb-4">
        At <strong>Nestro</strong>, we strive to provide the best experience for
        our members. Please read our refund policy carefully.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Membership Fees</h2>
      <p className="mb-4">
        All membership payments are final and non-refundable once processed.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Exceptions</h2>
      <p className="mb-4">Refunds may only be issued if:</p>
      <ul className="list-disc list-inside mb-4">
        <li>You were charged by mistake due to a technical error.</li>
        <li>
          You cancel within 24 hours of purchase and have not used any premium
          features.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">3. Cancellations</h2>
      <p className="mb-4">
        You may cancel your membership at any time, but the cancellation will
        only stop future renewals. No refunds will be given for the remaining
        days of an active membership.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Contact Us</h2>
      <p className="mb-4">
        If you believe you are eligible for a refund, please contact us at
        <span className="font-medium"> contact@nestro.com </span> with your payment
        details.
      </p>
    </div>
    </div>
  );
};

export default RefundPolicy;
