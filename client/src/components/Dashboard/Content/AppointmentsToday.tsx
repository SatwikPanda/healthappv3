import React from "react";
import { useState, useEffect } from "react";

import { Models } from "appwrite";
import { databaseId, collectionId } from "../../../utils/Credentials";
import { databases } from "../../../utils/appwrite";

const AppointmentsToday = () => {
  const [appointments, setAppointments] = useState<Models.Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionId
        );
        setAppointments(response.documents);/*
        const today = new Date().toISOString().split("T")[0];
        const filteredAppointments = appointments.filter(
          (appointment) =>
            appointment.appointmentDate === today
        );
        setAppointments(filteredAppointments); */
      } catch(error) {
        console.log(error);
      }
    }
    fetchDocuments();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-medium py-14 px-10 w-full border-b-2 bg-white/5 border-[#DB1A5A] rounded-b-xl">Appointments Today</h1>
      <div>{new Date().toISOString().split("T")[1]}</div>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment.$id}>
            <p>ID: {appointment.$id}</p>
            <p>Patient Name: {appointment.fullName}</p>
            <p>Appointment Date: {appointment.appointmentDate}</p>
          </div>
        ))
      ) : (
        <p>No appointments for today.</p>
      )}
    </div>
  );
};

export default AppointmentsToday;
