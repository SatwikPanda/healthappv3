import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { databases } from "../../utils/appwrite";
import { databaseId, collectionIdPatients } from "../../utils/Credentials";
import { Query } from "appwrite";

const CheckAppointments = () => {
  const [patientId, setPatientId] = useState("");

    const checkStatus = async () => {
        try {
            const response = await databases.listDocuments(databaseId, collectionIdPatients, [ Query.equal("patientNumber", patientId) ]);

            if(response.documents.length > 0) {
                const appointmentStatus = response.documents[0].appointmentStatus;
                alert(`Appointment status: ${appointmentStatus}`);
            } else {
                alert("No appointment found");
            }
        } catch (error) {
            console.error(error);
        }
    }

  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-4 px-10">
      <h1 className="text-2xl w-full tracking-tighter font-semibold text-center p-10">
        Enter Patient ID
      </h1>

      <div className="flex flex-col">
        <input
          type="text"
          name="patientId"
          id=""
          placeholder="Patient Id"
          onChange={(e) => setPatientId(e.target.value)}
          className="tex-lg px-4 py-2 rounded-md"
        />
      </div>
      <button
        onClick={checkStatus}
        className={`bg-black py-4 px-8 text-white rounded-lg tracking-tight font-medium transition hover:bg-black/70`}
      >
        Check
      </button>
    </div>
  );
};

export default CheckAppointments;
