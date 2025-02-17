"use client";

import { IoNotificationsOutline } from "react-icons/io5";
import { toast } from "sonner";

export const NotifyButton = () => {
  return (
    <button
      onClick={() => {
        toast.success("You will be notified when this movie is available!", {
          position: "bottom-right",
          duration: 3000,
        });
      }}
      className="flex items-center justify-center gap-2 px-8 py-2 text-sm bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium transition-colors"
    >
      <IoNotificationsOutline size={18} />
      <span>Notify Me</span>
    </button>
  );
};
