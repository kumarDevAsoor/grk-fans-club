import React, { useState } from "react";
import MembershipForm from "../../components/forms/MembershipForm";

const Membership = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-b from-[#071B4C] to-[#0a2559]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-gray-300 text-lg">
            Complete your membership application in just 4 easy steps
          </p>
        </div>
        <MembershipForm />
      </div>
    </div>
  );
};

export default Membership;
