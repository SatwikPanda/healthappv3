import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { databases } from "../../utils/appwrite";
import { databaseId, collectionIdPatients } from "../../utils/Credentials";
import { Query } from "appwrite";

const ConfirmationPage = () => {
  const { patientNumber } = useParams();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatient = async () => {
    try {
      if (patientNumber) {
        const response = await databases.listDocuments(
          databaseId,
          collectionIdPatients,
          [Query.equal("patientNumber", patientNumber)]
        );
        if (response.documents.length > 0) {
          setPatient(response.documents[0]);
        } else {
          setError("Patient not found.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch patient details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [patientNumber]);

  return (
    <div className="min-h-screen bg-neutral-500 flex">
      {/* Confirmation Box */}
      <div className="absolute bottom-0 left-0 bg-red-500 p-8 rounded-tr-lg text-white shadow-lg w-1/3">
        <h1 className="text-2xl font-bold">Confirmation Page</h1>
        <p className="mt-4 text-lg">
          Your patient number is:{" "}
          <span className="font-semibold">{patientNumber}</span>
        </p>
      </div>

      {/* Appointment Details */}
      <div className="flex-1 bg-blue-500 text-white p-8 overflow-y-auto">
        {loading ? (
          <p className="text-center text-lg">Loading patient details...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-400">{error}</p>
        ) : (
          patient && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Appointment Details</h2>
              <div className="space-y-4">
                <p>
                  <span className="font-semibold">Patient Name:</span>{" "}
                  {patient.fullName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {patient.email}
                </p>
                <p>
                  <span className="font-semibold">
                    Preferred Appointment Date:
                  </span>{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(patient.preferredAppointmentDate))}
                </p>

                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {patient.appointmentStatus}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;
