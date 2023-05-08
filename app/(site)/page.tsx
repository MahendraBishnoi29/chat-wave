import Image from "next/image";
import AuthFrom from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center pb-6 sm:px-7 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto w-auto my-0"
          alt="logo"
          height="100"
          width="200"
          src="/images/logo.png"
        />
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign In to your account
        </h2>
      </div>
      <AuthFrom />
    </div>
  );
}
