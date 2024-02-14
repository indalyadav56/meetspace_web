"use client";

function UserStatusIndicator({ isOnline }: any) {
  if (isOnline) {
    return (
      <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-white absolute bottom-0.5 right-0.5"></span>
    );
  }
  return (
    <span className="w-4 h-4 rounded-full bg-gray-500 border-2 border-white absolute bottom-0.5 right-0.5"></span>
  );
}

export default UserStatusIndicator;
