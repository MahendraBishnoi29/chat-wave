"use client";

import { BsGithub, BsGoogle } from "react-icons/bs";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import AuthSocialButton from "./AuthSocialButton";
import { signIn } from "next-auth/react";

type Variant = "LOGIN" | "REGISTER";

const AuthFrom = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [loading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then((res) => {
          if (res.statusText === "OK") {
            toast.success("Signed Up. You can login now");
          }
        })
        .catch(() => toast.error("Email is already taken"))
        .finally(() => setLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback?.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged In");
          }
        })
        .finally(() => setLoading(false));
    }

    // next social sign in
  };

  const socialAction = (action: string) => {
    setLoading(true);
  };

  return (
    <div className="mt-7 sm:mx-auto sm:w-full px-4 lg:px-0 sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={loading}
            />
          )}

          <Input
            id="email"
            label="Email"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            disabled={loading}
            errors={errors}
          />
          <div>
            <Button disabled={loading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-5">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or Continue With
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("github")}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-5 px-2 text-gray-500">
          {variant === "LOGIN"
            ? "New to SpeakEasy?"
            : "Already have an account?"}
          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Log In"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFrom;
