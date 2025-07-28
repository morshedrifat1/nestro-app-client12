import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Toast from "../../components/toast/Toast";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setLoader(false);
      setError(error.message);
    } else {
      setError("");
    }

    const amount = 90 * 100;
    const res = await axiosSecure.post("/create-payment-intent", {
      amount: amount,
      currency: "usd",
    });
    const clientSecret = res.data.clientSecret;

    // Confirm the payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });
    //  Handle the result
    if (result.error) {
      setLoader(false);
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        try {
          const res = await axiosSecure.patch("/users/membership", {
            email: user.email,
            membership: "Gold",
          });
          navigate('/dashboard/user-profile');
            Toast({ type: "success", message: res.data.message });
          setLoader(false);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Payment Info
        </h2>

        <label className="text-lg font-medium text-gray-700">
          Card Information
        </label>

        <div className="border border-gray-300 rounded-md p-3 shadow-sm bg-gray-50 mt-2">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1a202c",
                  fontFamily: "Inter, sans-serif",
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#e53e3e",
                },
              },
            }}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 mt-1 font-normal">{error}</p>
        )}

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-black hover:bg-black/85 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loader ? <span className="loading loading-dots loading-sm"></span>
 : "Pay $90"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
