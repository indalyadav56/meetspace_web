import CallRoom from "@/components/CallRoom";
import NavBar from "@/components/NavBar";
import React from "react";

const Call = () => {
  return (
    <main className="w-screen h-screen flex flex-col overflow-hidden">
      <NavBar />
      <CallRoom />
    </main>
  );
};

export default Call;
