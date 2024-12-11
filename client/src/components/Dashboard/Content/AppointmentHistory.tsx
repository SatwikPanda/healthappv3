import React from "react";
import { useState, useEffect } from "react";

import { Models } from "appwrite";

import { databases } from "../../../utils/appwrite";
import { databaseId, collectionIdPatients } from "../../../utils/Credentials";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState<Models.Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionIdPatients
        );
        setAppointments(response.documents);
        appointments
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort(
            (a, b) =>
              new Date(b.$createdAt).getTime() -
              new Date(a.$createdAt).getTime()
          );
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-medium py-14 px-10 w-full border-b-2 bg-white/5 border-[#DB1A5A] rounded-b-xl">Appointments History</h1>
      <table className="w-full border-collapse">
        <thead className="border border-white/15">
          <tr className="bg-[#131315]">
            <th className="border border-white/15 py-4">Serial</th>
            <th className="border border-white/15">Name</th>
            <th className="border border-white/15">Patient Number</th>
            <th className="border border-white/15">Phone Number</th>
            <th className="border border-white/15">Status</th>
            <th className="border border-white/15">Created</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.$createdAt).getTime() -
                  new Date(a.$createdAt).getTime()
              )
              .map((doc, index) => (
                <tr
                  key={doc.$id}
                  className="text-center border-b border-white/15"
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
                    {doc.appointmentStatus || "Pending"}
                  </td>
                  <td className="border border-white/15 py-2">
                    {new Date(doc.$createdAt).toLocaleString() || "Pending"}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
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
