import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserStatusIndicator from "./UserStatusIndicator";
import { Button } from "./ui/button";

interface UserAvatarProps {
  onClick?: () => void;
  isOnline?: boolean;
  size?: string;
  imgSrc?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const {
    onClick,
    isOnline,
    size = "md",
    imgSrc = "https://github.com/shadcn.png",
  } = props;

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "w-10 h-10";
      case "md":
        return "w-12 h-12";
      case "lg":
        return "w-20 h-20";
      case "xl":
        return "w-32 h-32";
      default:
        return "w-14 h-14";
    }
  };

  return (
    <Avatar
      onClick={onClick}
      className={`cursor-pointer w- ${getSizeClasses(size)}`}
    >
      <AvatarImage src={imgSrc} />
      <AvatarFallback>IN</AvatarFallback>
      {isOnline && <UserStatusIndicator isOnline={isOnline} />}
    </Avatar>
  );
};

export default UserAvatar;
