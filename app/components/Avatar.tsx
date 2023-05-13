"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type AvatarProps = {
  user: User;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="avatar"
          src={
            user?.image ||
            "https://pbs.twimg.com/profile_images/1429067381511311368/IW-5B8s3_400x400.png"
          }
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
