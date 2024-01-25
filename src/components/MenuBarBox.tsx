import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";

interface MenuBarBoxProps {
  triggerContent: React.ReactNode;
  menuList: Array<Object>;
}

const MenuBarBox: React.FC<MenuBarBoxProps> = (props) => {
  const { menuList, triggerContent } = props;
  const onMenuClick = () => {
    alert("Menu client");
  };
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger asChild>{triggerContent}</MenubarTrigger>
        <MenubarContent>
          {menuList.map((menu, index) => (
            <MenubarItem key={index} onClick={onMenuClick}>
              {menu}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuBarBox;
