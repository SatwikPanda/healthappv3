import React, { useState, useEffect } from "react";
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
      <div className="overflow-x-auto">
        {appointments.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-200 mt-6">
            <thead>
              <tr className="bg-white/15">
                <th className="border border-white/15 px-4 py-2">#</th>
                <th className="border border-white/15 px-4 py-2">Patient ID</th>
                <th className="border border-white/15 px-4 py-2">
                  Patient Name
                </th>
                <th className="border border-white/15 px-4 py-2">
                  Appointment Time
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment.$id} className={index % 2 === 0 ? "" : ""}>
                  <td className="border border-white/15 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-white/15 px-4 py-2 text-center">
                    {appointment.patientNumber || "N/A"}
                  </td>
                  <td className="border border-white/15 px-4 py-2 text-center">
                    {appointment.fullName || "N/A"}
                  </td>
                  <td className="border border-white/15 px-4 py-2 text-center">
                    {appointment.preferredAppointmentDate
                      ? new Date(
                          appointment.preferredAppointmentDate
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-6 text-center">No appointments for today.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsToday;
