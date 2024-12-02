import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GiHealthNormal } from "react-icons/gi";
import { FaClock } from "react-icons/fa";

function Navbar({ dashboardNumber }: { dashboardNumber: number }) {
  const [isImageAvailable, setIsImageAvailable] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  const navigate = useNavigate();
  const dashNumber = dashboardNumber;
  const greetingMessage = () => {
    const timehrs = new Date().getHours();
    if (timehrs < 12 && timehrs >= 5) {
      return "Good Morning";
    } else if (timehrs < 18 && timehrs >= 12) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const greetMessage = greetingMessage();

  return (
    <nav className="w-full bg-[#131315] text-[#EDEDF0] border-b border-white/15 flex justify-between items-center gap-4">
      <div className="px-10 font-bold text-3xl flex gap-4 items-center">
        <GiHealthNormal className="text-4xl text-[#DB1A5A]" />
        <span className="pb-[0.3rem]">Docapp</span>
      </div>
      <div className="px-4 py-2 bg-white/20 text-white rounded-full flex gap-2 items-center">
        <FaClock className="text-xl"/>
        {time}
      </div>
      <div className="flex  items-center gap-4 border-l border-white/15 py-2 px-6">
        <span className="font-medium text-white">{greetMessage}</span>
        {/*Make it pop as custom profile picture*/}
        <div
          className="h-10 w-10 rounded-full bg-[#DB1A5A]"
          onClick={(e) => navigate("/")}
        ></div>
      </div>
    </nav>
  );
}

export default Navbar;
