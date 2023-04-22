"use client";

import { addFriendValidator } from "@/lib/validations/add-friend";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./ui/Button";
import { toast } from "react-hot-toast";

interface AddFriendButtonProps {}
type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const [successState, setSuccessState] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validateEmail = addFriendValidator.parse({ email });
      await axios.post("/api/friends/add", {
        email: validateEmail,
      });

      setSuccessState(true);
      toast.success("Friend Request Sent");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError("email", { message: err.message });
        return;
      }

      if (err instanceof AxiosError) {
        setError("email", { message: err.response?.data });
        return;
      }
      setError("email", { message: "Something Went Wrong!" });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by Email
      </label>
      <div className="mt-2 flex gap-4">
        <input
          {...register("email")}
          type="text"
          placeholder="you@example.com"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <Button>Add</Button>
      </div>
      <p className="mt-1 text-sm text-red-600">{errors?.email?.message}</p>
      {/* {successState ? (
        <p className="mt-1 text-sm text-green-600">Friend Request Sent!</p>
      ) : null} */}
    </form>
  );
};

export default AddFriendButton;
