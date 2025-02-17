"use client";

export const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Date & Time", "Seat Selection", "Payment"];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              index <= currentStep
                ? "bg-purple-500 text-white"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            {index + 1}
          </div>
          <div
            className={`mx-2 text-sm ${
              index <= currentStep ? "text-white" : "text-gray-400"
            }`}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 ${
                index < currentStep ? "bg-purple-500" : "bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
