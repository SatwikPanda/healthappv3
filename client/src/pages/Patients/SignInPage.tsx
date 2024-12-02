import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { GiHealthNormal } from "react-icons/gi";

const SignInPage = () => {
  const [loginIn, setLoginIn] = useState(true);

  const navigate = useNavigate();
  //TODO: create new User and send him to the booking page
  return (
    <div className="min-h-screen bg-[url('/public/backgroundSignin.jpg')] bg-cover flex justify-center items-center flex-col relative">
      <button
        className="absolute top-0 right-0 bg-gray-400 p-2 rounded-lg"
        onClick={() => navigate("/patients/checkAppointment")}
      >
        {" "}
        Check Appoinments
      </button>
      <div className="flex flex-col gap-4 border border-black/15 bg-black/5 rounded-lg px-8 py-4 z-99">
        <div className="text-center flex w-[20rem] text-xl tracking-tighter gap-2 font-semibold">
          <span
            onClick={() => setLoginIn(true)}
            className={`w-1/2 py-2 px-4 rounded-md cursor-pointer transition ${loginIn ? "bg-black text-white" : " hover:bg-black/10"}`}
          >
            Login
          </span>
          <span
            onClick={() => setLoginIn(false)}
            className={`w-1/2 py-2 px-4 rounded-md cursor-pointer transition ${loginIn ? "hover:bg-black/10" : "bg-black text-white"}`}
          >
            Register
          </span>
        </div>

        <h1 className="text-2xl w-full tracking-tighter font-semibold text-center p-10">
          {loginIn ? "Welcome Back" : "Create a new Account"}
        </h1>

        <div className="flex flex-col">
          <input
            type="text"
            name="email"
            id=""
            placeholder="Email"
            className="tex-lg px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="Password"
            name="email"
            id=""
            placeholder="Password"
            className="tex-lg px-4 py-2 rounded-md"
          />
        </div>
        <button
          onClick={() => navigate("/patients")}
          className="bg-black py-4 px-8 text-white rounded-lg tracking-tight font-medium transition hover:bg-black/70"
        >
          {loginIn ? "Login in with email" : "Register with Email"}
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
