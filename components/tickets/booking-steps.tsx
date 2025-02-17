"use client";

import { useState } from "react";
import { Stepper } from "./stepper";
import { DateTimeSelection } from "./date-time-selection";
import { SeatSelection } from "./seat-selection";
import { PaymentForm } from "./payment-form";

interface PaymentData {
  fullName: string;
  phone: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export const BookingSteps = ({ movieId }: { movieId: string }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleDateTimeSelect = (dateTime: string) => {
    setSelectedDateTime(dateTime);
    setCurrentStep(1);
  };

  const handleSeatSelect = (seats: string[]) => {
    setSelectedSeats(seats);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (paymentData: PaymentData) => {
    console.log("Payment Data:", paymentData);
  };

  return (
    <div>
      <Stepper currentStep={currentStep} />

      {currentStep === 0 && (
        <DateTimeSelection onSelect={handleDateTimeSelect} />
      )}

      {currentStep === 1 && (
        <SeatSelection
          movieId={movieId}
          dateTime={selectedDateTime!}
          onSelect={handleSeatSelect}
        />
      )}

      {currentStep === 2 && (
        <PaymentForm
          movieId={movieId}
          dateTime={selectedDateTime!}
          seats={selectedSeats}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </div>
  );
};
