import React, { useState, useEffect } from "react";
import { Models } from "appwrite";
import { databases } from "../../../utils/appwrite";
import { databaseId, collectionIdPatients } from "../../../utils/Credentials";

import log from "../../../utils/logger";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState<Models.Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionIdPatients
        );
        setAppointments(
          response.documents
            .slice()
            .sort(
              (a, b) =>
                new Date(b.$createdAt).getTime() -
                new Date(a.$createdAt).getTime()
            )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocuments();
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    now.setMinutes(now.getMinutes() - offset); // Adjust to local time
    return now.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:mm
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await databases.updateDocument(databaseId, collectionIdPatients, id, {
        appointmentStatus: status,
      });

      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.$id === id ? { ...appt, appointmentStatus: status } : appt
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = async (id: string, newDate: string) => {
    try {
      const appointment = appointments.find((appt) => appt.$id === id);

      if (appointment) {
        await databases.updateDocument(databaseId, collectionIdPatients, id, {
          appointmentDate: newDate,
        });

        // Mock function to send email
        sendEmail(
          appointment.email,
          `Your appointment date has been updated to ${newDate}.`
        );

        setAppointments((prevAppointments) =>
          prevAppointments.map((appt) =>
            appt.$id === id ? { ...appt, appointmentDate: newDate } : appt
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = (email: string, message: string) => {
    console.log(`Sending email to ${email}: ${message}`);
    // Add your email logic here (e.g., using a server-side function or third-party API)
  };

  return (
    <div>
      <h1 className="text-4xl font-medium py-14 px-10 w-full border-b-2 bg-white/5 border-[#DB1A5A] rounded-b-xl">
        Appointments History
      </h1>
      <table className="w-full border-collapse">
        <thead className="border border-white/15">
          <tr className="bg-[#131315]">
            <th className="border border-white/15 py-4">Serial</th>
            <th className="border border-white/15">Name</th>
            <th className="border border-white/15">Patient Number</th>
            <th className="border border-white/15">Phone Number</th>
            <th className="border border-white/15">Status</th>
            <th className="border border-white/15">Appointment Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((doc, index) => (
              <tr
                key={doc.$id}
                className={`text-center border-b border-white/15 
          ${doc.appointmentStatus === "Pending" ? "bg-yellow-400/10" : ""}
          ${doc.appointmentStatus === "Rejected" ? "bg-red-400/10" : ""}
          ${doc.appointmentStatus === "Accepted" ? "bg-green-400/10" : ""}`}
              >
                <td className="border border-white/15 py-2">{index + 1}</td>
                <td className="border border-white/15 py-2">
                  {doc.fullName || "N/A"}
                </td>
                <td className="border border-white/15 py-2">
                  {doc.patientNumber || "N/A"}
                </td>
                <td className="border border-white/15 py-2">
                  {doc.phoneNumber || "N/A"}
                </td>
                <td className="border border-white/15 py-2">
                  {doc.appointmentStatus || "N/A"}
                </td>
                <td className="border border-white/15 py-2">
                  <span>
                    {doc.appointmentDate
                      ? new Date(doc.appointmentDate).toLocaleString()
                      : new Date(
                          doc.preferredAppointmentDate
                        ).toLocaleString() || "N/A"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentHistory;
