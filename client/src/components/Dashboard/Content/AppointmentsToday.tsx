import React from "react";
import { useState, useEffect } from "react";

import { Models, Query } from "appwrite";
import { databaseId, collectionIdPatients } from "../../../utils/Credentials";
import { databases } from "../../../utils/appwrite";

const AppointmentsToday = () => {
  const [appointments, setAppointments] = useState<Models.Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const today = new Date();
        const localOffset = today.getTimezoneOffset() * 60000;
        const startOfDay = new Date(
          today.setHours(0, 0, 0, 0) - localOffset
        ).toISOString();
        const endOfDay = new Date(
          today.setHours(23, 59, 59, 999) - localOffset
        ).toISOString();

        console.log("Start of Day:", startOfDay);
        console.log("End of Day:", endOfDay);

        const response = await databases.listDocuments(
          databaseId,
          collectionIdPatients,
          [
            Query.greaterThanEqual("appointmentDate", startOfDay),
            Query.lessThanEqual("appointmentDate", endOfDay),
          ]
        );

        console.log("Response:", response);
        setAppointments(response.documents);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-medium py-14 px-10 w-full border-b-2 bg-white/5 border-[#DB1A5A] rounded-b-xl">
        Appointments Today
      </h1>
      <div>
        <br />
      </div>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment.$id}>
            <p>ID: {appointment.patientNumber}</p>
            <p>Patient Name: {appointment.fullName}</p>
            <p>Preferred Date: {appointment.preferredAppointmentDate}</p>
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
