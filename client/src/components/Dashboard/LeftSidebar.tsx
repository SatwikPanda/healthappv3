import React from "react";
import Span from "../Span";

import { MdNotificationsActive } from "react-icons/md";
import { IoTodaySharp } from "react-icons/io5";
import { MdBrowseGallery } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";

const LeftSidebar = ({
  dashboardNumber,
  onSelect,
  activeContent,
}: {
  dashboardNumber: number;
  onSelect: (content: string) => void;
  activeContent: string;
}) => {
  const leftSidebarItemsReceptionist = () => {
    return (
      <>
        <Span
          variant={activeContent === "Add Patient" ? "secondary" : "primary"}
          onClick={() => onSelect("Add Patient")}
          className="flex items-center gap-2"
        >
          <IoPersonAddSharp className="text-xl"/>
          Add Patient
        </Span>
      </>
    );
  };
  const leftSidebarItemsDoctor = () => {
    return (
      <>
        <Span
          variant={activeContent === "Check Patient" ? "secondary" : "primary"}
          onClick={() => onSelect("Check Patient")}
          className="flex items-center gap-2"
        >
          <FaUserCheck className="text-xl" />
          Check Patient
        </Span>
      </>
    );
  };
  return (
    <div className="w-[18rem] h-full p-5 bg-[#131315] border-r border-white/15 text-[#EDEDF0] text-sm">
      <div className="flex flex-col gap-3">
        <Span
          variant={activeContent === "Notifications" ? "secondary" : "primary"}
          onClick={() => onSelect("Notifications")}
          className="flex items-center gap-2"
        >
          <MdNotificationsActive className="text-xl" />
          Notifications
        </Span>
        <Span
          variant={
            activeContent === "Appointments Today" ? "secondary" : "primary"
          }
          onClick={() => onSelect("Appointments Today")}
          className="flex items-center gap-2"
        >
          <IoTodaySharp className="text-xl" />
          Appointments Today
        </Span>
        <Span
          variant={
            activeContent === "Appointment History" ? "secondary" : "primary"
          }
          onClick={() => onSelect("Appointment History")}
          className="flex items-center gap-2"
        >
          <MdBrowseGallery className="text-xl" />
          Appointment History
        </Span>
        {dashboardNumber === 0
          ? leftSidebarItemsDoctor()
          : leftSidebarItemsReceptionist()}
      </div>
    </div>
  );
};

export default LeftSidebar;
