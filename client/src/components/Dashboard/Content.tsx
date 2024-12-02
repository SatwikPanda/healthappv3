import React from "react";

import Notifications from "./Content/Notifications";
import AppointmentsToday from "./Content/AppointmentsToday";
import AppointmentHistory from "./Content/AppointmentHistory";
import AddPatient from "./Content/AddPatient";

const Content = ({ selectedContent }: { selectedContent: string }) => {
  if (selectedContent === "Notifications") {
    return (
      <div className="w-full">
        <Notifications />
      </div>
    );
  } else if (selectedContent === "Appointments Today") {
    return (
      <div className="w-full">
        <AppointmentsToday />
      </div>
    );
  } else if (selectedContent === "Appointment History") {
    return (
      <div className="w-full">
        <AppointmentHistory />
      </div>
    );
  } else if (selectedContent === "Add Patient") {
    return (
      <div className="w-full">
        <AddPatient />
      </div>
    );
  }
  return <div className="w-full">{selectedContent}</div>;
};

export default Content;
