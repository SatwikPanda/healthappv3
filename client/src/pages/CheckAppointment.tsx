import React from "react";
import { useState } from "react";



const CheckAppointment = () => {
  const [ appointmentNumber, setAppointmentNumber ] = useState("");


  return (
    <div className="relative min-h-screen flex justify-center items-center">
      <span className="absolute top-0">This part is for the patient to check for appointments</span>

      <div className="flex flex-col gap-4">
        <span>Enter your appointment number</span>
        <input
          type="text"
          value={appointmentNumber}
          onChange={(e) => setAppointmentNumber(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button className="p-2 bg-blue-500 text-white rounded-md">Check</button>
      </div>
    </div>
  );
};

export default CheckAppointment;
