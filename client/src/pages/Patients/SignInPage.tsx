import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckAppointments from "../../components/Patient/CheckAppointments";
import Form from "../../components/Patient/Form";

const SignInPage = () => {
  const [loginIn, setLoginIn] = useState(true);

  return (
    <div className="min-h-screen bg-[url('/public/backgroundSignin.jpg')] bg-cover flex justify-center items-center flex-col relative p-20">
      <div className="flex flex-col gap-4 border border-black/15 bg-neutral-100 rounded-lg px-4 py-4 z-99 w-full max-w-xl">
        <div className="text-center flex gap-2 font-semibold">
          <span
            onClick={() => setLoginIn(true)}
            className={`flex-1 py-2 px-4 rounded-md cursor-pointer transition text-xl ${
              loginIn ? "bg-black text-white" : "hover:bg-black/10"
            }`}
          >
            Check
          </span>
          <span
            onClick={() => setLoginIn(false)}
            className={`flex-1 py-2 px-4 rounded-md cursor-pointer transition text-xl ${
              loginIn ? "hover:bg-black/10" : "bg-black text-white"
            }`}
          >
            Register
          </span>
        </div>
        <div className="w-full">{loginIn ? <CheckAppointments /> : <Form />}</div>
      </div>
    </div>
  );
};

export default SignInPage;
