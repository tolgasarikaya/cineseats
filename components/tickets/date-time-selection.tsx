"use client";

import { useState } from "react";
import { format, addDays } from "date-fns";

interface DateTimeSelectionProps {
  onSelect: (dateTime: string) => void;
}

export const DateTimeSelection = ({ onSelect }: DateTimeSelectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const times = ["10:00", "13:00", "16:00", "19:00", "22:00"];

  return (
    <div className="space-y-6">
      <h2 className="text-white text-xl mb-4">Select Date & Time</h2>

      <div className="space-y-3">
        <h3 className="text-gray-400 text-sm">Date</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {dates.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg border ${
                selectedDate?.toDateString() === date.toDateString()
                  ? "bg-purple-500 border-purple-500 text-white"
                  : "border-gray-600 text-gray-300 hover:border-purple-500"
              }`}
            >
              <div className="text-center">
                <div className="text-sm font-medium">{format(date, "EEE")}</div>
                <div className="text-lg">{format(date, "d")}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="space-y-3">
          <h3 className="text-gray-400 text-sm">Time</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => {
                  setSelectedTime(time);
                  onSelect(`${format(selectedDate, "yyyy-MM-dd")}T${time}:00`);
                }}
                className={`px-4 py-2 rounded-lg border ${
                  selectedTime === time
                    ? "bg-purple-500 border-purple-500 text-white"
                    : "border-gray-600 text-gray-300 hover:border-purple-500"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
