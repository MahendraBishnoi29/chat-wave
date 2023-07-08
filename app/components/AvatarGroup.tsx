import { User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: FC<AvatarGroupProps> = ({ users }) => {
  const slicedUsers = users?.slice(0, 3);
  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {slicedUsers?.map((user, i) => (
        <div
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${
            positionMap[i as keyof typeof positionMap]
          }`}
          key={user?.id}
        >
          <Image
            alt="groupAvatar"
            fill
            src={
              user?.image ||
              "https://media.cnn.com/api/v1/images/stellar/prod/230614113205-andrew-tate-romania-file-042123.jpg?c=3x4"
            }
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
