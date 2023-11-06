import React, { useState } from "react";
import "./SideBar.css";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import UsersIcon from "../../assets/icons/UsersIcon";
import VerificationCenterIcon from "../../assets/icons/VerificationCenterIcon";
import SubscriptionIcon from "../../assets/icons/SubscriptionIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import { Squash } from "hamburger-react";
import IconButton from "components/IconButton/IconButton";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, changeIndex] = useState<number>(0);

  const handleItemClick = (index: React.SetStateAction<number>) => {
    changeIndex(index);
  };

  const sideMenus = [
    {
      title: "Dashboard",
      icon: <DashboardIcon isSelected={currentIndex === 0 ? true : false} />,
      to: "/dashboard",
    },
    {
      title: "Users Management",

      icon: <UsersIcon isSelected={currentIndex === 1 ? true : false} />,
      to: "/dashboard",
    },
    {
      title: "Verification Center",

      icon: (
        <VerificationCenterIcon
          isSelected={currentIndex === 2 ? true : false}
        />
      ),
      to: "/dashboard",
    },

    {
      title: "Subscription",

      icon: <SubscriptionIcon isSelected={currentIndex === 3 ? true : false} />,
      to: "/dashboard",
    },
    {
      title: "Logout",

      icon: <LogoutIcon isSelected={currentIndex === 4 ? true : false} />,
      to: "/login",
    },
  ];

  return (
    <aside className={`${isOpen ? "" : "isClosed"} sidebar`}>
      <IconButton className="m-2 self-end">
        <Squash
        toggled={isOpen}
        duration={0.7}
          size={20}
          onToggle={(isOpened) => {
            setIsOpen(isOpened);
          }}
        />
      </IconButton>
      {sideMenus.map((e, index) => (
        <Link
          to={e.to}
          key={index}
          replace
          onClick={() => {
            handleItemClick(index);
          }}
          className={`${currentIndex === index ? "selected" : ""} item`}
        >
          <li>
            {e.icon}

            <p className="text">{e.title}</p>
          </li>
        </Link>
      ))}
    </aside>
  );
}
