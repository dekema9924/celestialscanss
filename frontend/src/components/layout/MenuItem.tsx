import React from "react";

interface MenuItemProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
    return (
        <li

            className="
      relative
      px-4 py-2
      flex 
      items-center
      gap-2
      cursor-pointer
      rounded-md
      transition-all duration-300
      text-gray-400
      hover:text-white
      hover:bg-blue-500
      hover:scale-105
      hover:shadow-lg
      "
            onClick={onClick}
        >
            {children}
        </li>
    );
};

export default MenuItem;



