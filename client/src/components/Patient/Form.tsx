import React from "react";
import { useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { databases } from "../../utils/appwrite";

import log from "../../utils/logger";

const PatientForm = () => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [problems, setProblems] = useState("");
  const [history, setHistory] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [preferredAppointmentDate, setPreferredAppointmentDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendEmail = async (patientId) => {
    try {
      const emailData = {
        to: email,
        subject: "Successful registration",
        html: `
        <div style="">
        <h1>Thank you for registering</h1>
        <p>Your patient number is ${patientId}</p>
        <p>Your patient number is ${fullName}</p>
        </div>`,
      };
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const patientId = Date.now().toString();
    const databaseId = "674187b9002c9f4f90db";
    const collectionId = "674187c6001ba388d273";
    console.log("Creating document");
    try {
      setLoading(true);
      setPatientNumber(patientId);
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        "unique()",
        {
          patientNumber: patientId,
          fullName,
          age: parseInt(age),
          phoneNumber,
          email,
          gender,
          bloodGroup,
          weight: parseFloat(weight),
          height: parseFloat(height),
          problems,
          history,
          preferredAppointmentDate,
        }
      );
      log(`New appointment created with patient ID ${patientId}`);
      sendEmail(patientId);
      console.log(`Document Created and email sent ${patientId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    handleSubmit();
    navigate("/patients/confirmation");
  };

  return (
    <div className="bg-neutral-400 p-4 flex gap-4 rounded-lg relative">
      <div>
        <div className="flex flex-col">
          <label htmlFor="fullname">Enter full name</label>
          <input
            type="text"
            id="fullname"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phNumber">Phone Number</label>
          <input
            type="text"
            id="phNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="gender">gender</label>
          <input
            type="text"
            id="gender"
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="bloodGroup">blood group</label>
          <input
            type="text"
            id="bloodGroup"
            onChange={(e) => setBloodGroup(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="weight">weight (kg)</label>
          <input
            type="number"
            id="weight"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="height">height (cm)</label>
          <input
            type="number"
            id="height"
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="preferredAppointmentDate">
            Preferred Appointment Date
          </label>
          <input
            type="datetime-local"
            id="preferredAppointmentDate"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setPreferredAppointmentDate(date.toISOString());
            }}
          />
        </div>
      </div>

      <div className="h-full gap-4 flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="problems">Enter Problems</label>
          <input
            type="textarea"
            id="problems"
            onChange={(e) => setProblems(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="history">Enter history</label>
          <input
            type="textarea"
            id="history"
            onChange={(e) => setHistory(e.target.value)}
          />
        </div>
      </div>

      {/*TODO: On submit send email with a format and go to confirmation page */}
      <button
        className="absolute bottom-4 right-4 p-2 bg-blue-600 rounded-lg text-white "
        onClick={() => {
          handleClick();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default PatientForm;
