"use client";

import { signOut } from "next-auth/react";

type Props = {};

const page = (props: Props) => {
  return <button onClick={() => signOut()}>LOG OUT</button>;
};

export default page;
