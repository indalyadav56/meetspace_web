"use client";

import React, { useState } from "react";
import Footer from "./components/Footer";

const Home = () => {
  const users = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];

  return (
    <main className="h-screen w-screen flex flex-col">
      <div className="flex-1 flex flex-wrap w-full gap-2 bg-white">
        {users?.map((item) => (
          <div key={item} className="flex p-16 bg-gray-100">
            WelCome to this page.
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
};
export default Home;
