import React from "react";
import PatientForm from "../components/Patient/Form";
import { Outlet, useNavigate } from "react-router-dom";

export default function Patient() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-center items-center flex-col relative">
      This is the patients form Page
      <span>Current bugs: the patient id is being logged in the database but not getting sent in the email</span>
      <PatientForm />
    </div>
  );
}