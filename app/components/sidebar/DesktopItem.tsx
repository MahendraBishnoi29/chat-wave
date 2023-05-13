"use client";

import clsx from "clsx";
import Link from "next/link";

type DesktopItemProps = {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
};

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 transition duration-300 ease-in-out hover:text-black",
          active && "bg-gray-200 text-black",
          active ? "hover:bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
