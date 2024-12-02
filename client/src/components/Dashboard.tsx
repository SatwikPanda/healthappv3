import React from "react";
import { useState } from "react";

import Navbar from "./Dashboard/Navbar";
import LeftSidebar from "./Dashboard/LeftSidebar";
import Content from "./Dashboard/Content";

//dashboard number 0 is for doctor dashboard and 1 is for receptionist dashboard
export default function Dashboard({
  dashboardNumber,
}: {
  dashboardNumber: number;
}) {
  const [selectedContent, setSelectedContent] =
    useState<string>("Notifications");

  return (
    <>
      {/* This is the layout component of the dashboard*/}
      <div className="bg-[#18181B] flex flex-col h-screen">
        <div className="flex flex-col w-full h-full">
          <Navbar dashboardNumber={dashboardNumber} />
          <div className="h-full w-full flex text-[#EDEDF0]">
            <LeftSidebar
              dashboardNumber={dashboardNumber}
              onSelect={(content) => setSelectedContent(content)}
              activeContent={selectedContent}
            />
            <Content selectedContent={selectedContent} />
          </div>
        </div>
      </div>
    </>
  );
}
