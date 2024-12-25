import React from "react";
import { useState } from "react";
import Button from "../Button";
import { useNavigate, useParams } from "react-router-dom";
import { databases } from "../../utils/appwrite";

import { FaMale, FaFemale, FaGenderless } from "react-icons/fa";

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

      navigate(`/patients/confirmation/${patientId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    handleSubmit();
  };

  return (
    <div className=" p-6 max-w-4xl mx-auto rounded-lg relative outline-none bg-white shadow-lg">
      <h2 className="text-2xl font-bold text-black tracking-tight mb-6 text-center">
        Book an Appointment
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
        {/* Left Section */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="fullname" className="text-gray-600 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="p-2 border bg-inherit border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="text-gray-600 font-medium">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="p-2 border border-gray-300 bg-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phNumber" className="text-gray-600 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phNumber"
              className="p-2 border border-gray-300 bg-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="p-2 border border-gray-300 bg-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="bloodGroup" className="text-gray-600 font-medium">
              Blood Group
            </label>
            <input
              type="text"
              id="bloodGroup"
              className="p-2 border border-gray-300 bg-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setBloodGroup(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="weight" className="text-gray-600 font-medium">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              className="p-2 border border-gray-300 bg-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="height" className="text-gray-600 font-medium">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              className="p-2 border border-gray-300 bg-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="preferredAppointmentDate"
              className="text-gray-600 font-medium"
            >
              Preferred Appointment Date
            </label>
            <input
              type="datetime-local"
              id="preferredAppointmentDate"
              className="p-2 border border-gray-300 bg-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => {
                const date = new Date(e.target.value);
                setPreferredAppointmentDate(date.toISOString());
              }}
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="md:col-span-2 space-y-4">
          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-2">Gender</label>
            <div className="flex items-center gap-4 w-full">
              <button
                className={`p-2 border rounded-lg w-full bg-inherit flex items-center justify-center gap-2 transition ${gender === "male" ? "bg-blue-500 text-white" : "border-gray-300 text-gray-600"}`}
                onClick={() => setGender("male")}
              >
                <FaMale /> Male
              </button>
              <button
                className={`p-2 border rounded-lg w-full bg-inherit flex items-center justify-center gap-2 transition ${gender === "female" ? "bg-pink-500 text-white" : "border-gray-300 text-gray-600"}`}
                onClick={() => setGender("female")}
              >
                <FaFemale /> Female
              </button>
              <button
                className={`p-2 border rounded-lg w-full bg-inherit flex items-center justify-center gap-2 transition ${gender === "other" ? "bg-green-500 text-white" : "border-gray-300 text-gray-600"}`}
                onClick={() => setGender("other")}
              >
                <FaGenderless /> Other
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="problems" className="text-gray-600  font-medium">
              Problems
            </label>
            <textarea
              id="problems"
              className="p-2 border border-gray-300 bg-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              onChange={(e) => setProblems(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="history" className="text-gray-600  font-medium">
              History
            </label>
            <textarea
              id="history"
              className="p-2 border border-gray-300 bg-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              onChange={(e) => setHistory(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="mt-4 w-full bg-black py-4 px-8 text-white rounded-lg tracking-tight font-medium transition hover:bg-black/70"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};

export default PatientForm;
