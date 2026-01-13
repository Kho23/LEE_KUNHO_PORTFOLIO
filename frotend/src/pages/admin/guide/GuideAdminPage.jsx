import React, { useState } from "react";
import GuideEditPage from "./GuideEditPage";
import GuideViewPage from "./GuideViewPage";

const GuideAdminPage = () => {
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-1/2 p-6 overflow-auto bg-white">
        <GuideViewPage />
      </div>

      <div className="w-px bg-gray-300"></div>

      <div className="w-1/2 p-6 overflow-auto bg-gray-50">
        <GuideEditPage />
      </div>
    </div>
  );
};

export default GuideAdminPage;
