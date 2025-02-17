"use client";

import { useState, useEffect } from "react";

interface SeatSelectionProps {
  movieId: string;
  dateTime: string;
  onSelect: (seats: string[]) => void;
}

export const SeatSelection = ({
  movieId,
  dateTime,
  onSelect,
}: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 12;

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      }
      if (prev.length >= 8) return prev;
      return [...prev, seatId];
    });
  };

  const handleConfirm = () => {
    if (selectedSeats.length > 0) {
      onSelect(selectedSeats);
    }
  };

  useEffect(() => {
    console.log(`Loading seats for movie ${movieId} at ${dateTime}`);
  }, [movieId, dateTime]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-white text-xl mb-4">Select Your Seats</h2>
        <p className="text-gray-400 text-sm">You can select up to 8 seats</p>
      </div>

      <div className="w-full">
        <div className="w-3/4 h-2 bg-purple-500 mx-auto rounded-lg mb-2" />
        <p className="text-gray-400 text-sm text-center">Screen</p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="w-fit mx-auto space-y-2">
          {rows.map((row) => (
            <div key={row} className="flex gap-2">
              <div className="w-6 text-gray-400 flex items-center">{row}</div>
              {Array.from({ length: seatsPerRow }).map((_, index) => {
                const seatId = `${row}${index + 1}`;
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <button
                    key={seatId}
                    onClick={() => handleSeatClick(seatId)}
                    className={`w-8 h-8 rounded-t-lg ${
                      isSelected
                        ? "bg-purple-500"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-gray-600" />
          <span className="text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-purple-500" />
          <span className="text-gray-400">Selected</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-gray-400">
          Selected Seats: {selectedSeats.sort().join(", ")}
        </div>
        <button
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
          className="w-full py-3 bg-purple-500 rounded-lg text-white font-medium disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};
