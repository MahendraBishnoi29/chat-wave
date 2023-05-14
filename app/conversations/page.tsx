"use client";

import { FC } from "react";
import EmptyState from "../components/EmptyState";
import useConversation from "../hooks/useConversation";
import clsx from "clsx";

interface pageProps {}

const Home: FC<pageProps> = ({}) => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
