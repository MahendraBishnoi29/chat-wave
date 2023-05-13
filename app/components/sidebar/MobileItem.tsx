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

const MobileItems: React.FC<DesktopItemProps> = ({
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
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        "group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-200 transition duration-300 ease-in-out",
        active && "bg-gray-200 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItems;
