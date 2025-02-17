"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentFormProps {
  movieId: string;
  dateTime: string;
  seats: string[];
  onSubmit: (data: PaymentData) => Promise<void>;
}

interface PaymentData {
  fullName: string;
  phone: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export const PaymentForm = ({
  movieId,
  dateTime,
  seats,
  onSubmit,
}: PaymentFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<PaymentData>({
    fullName: "",
    phone: "",
    cardNumber: "Don't share your actual card number",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-white text-xl mb-4">Payment Details</h2>

      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <p className="text-gray-400">Movie ID: {movieId}</p>
        <p className="text-gray-400">
          Date & Time: {new Date(dateTime).toLocaleString()}
        </p>
        <p className="text-gray-400">Selected Seats: {seats.join(", ")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-gray-400 text-sm mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-400 text-sm mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label
            htmlFor="cardNumber"
            className="block text-gray-400 text-sm mb-2"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            maxLength={16}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expiry"
              className="block text-gray-400 text-sm mb-2"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              required
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="cvv" className="block text-gray-400 text-sm mb-2">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
              maxLength={3}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};
