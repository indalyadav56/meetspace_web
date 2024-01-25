import React from "react";

interface AppBarItemProps {
  Icon: React.ReactNode;
  title: string;
}

const AppBarItem: React.FC<AppBarItemProps> = ({ Icon, title }) => {
  return (
    <div className="flex flex-col items-center h-14 hover:bg-red-200 p-2">
      {Icon}
      <span className="text-xs mt-1">{title}</span>
    </div>
  );
};

export default AppBarItem;
