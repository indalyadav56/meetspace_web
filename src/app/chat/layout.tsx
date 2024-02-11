import SideBar from "@/components/SideBar";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: Readonly<RootLayoutProps>) {
  return (
    <main className="w-screen h-screen flex overflow-hidden">
      <SideBar />
      {children}
    </main>
  );
}
