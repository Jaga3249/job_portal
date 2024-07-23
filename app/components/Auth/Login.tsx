"use client";
import useLoginUser from "@/app/_hooks/useLoginUser";
import { Button, Input, TextInput } from "@mantine/core";
import { RiEyeFill, RiEyeOffFill } from "@remixicon/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialState);
  const [isShow, setIsShow] = useState<boolean>(true);
  const { handleLogin, loading } = useLoginUser();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      toast.error("Please provide a valid email address");
      return;
    }
    await handleLogin(loginData.email, loginData.password);
    setLoginData(initialState);
  };

  return (
    <div className=" h-full flex justify-center items-center">
      <div className="flex  flex-col  border-[1px] rounded-md w-[90%] sm:w-[35%] px-4 py-6 shadow-sm">
        <h1 className="text-center uppercase text-2xl text-blue-600 font-bold">
          Login
        </h1>
        <TextInput
          label="Email"
          placeholder="Enter email"
          type="email"
          value={loginData.email}
          name="email"
          onChange={handleChange}
        />
        <TextInput
          label="Password"
          placeholder="Enter password"
          type={isShow ? "text" : "password"}
          value={loginData.password}
          name="password"
          onChange={handleChange}
          rightSection={
            isShow ? (
              <RiEyeFill
                onClick={() => setIsShow(!isShow)}
                className="cursor-pointer "
                size={20}
              />
            ) : (
              <RiEyeOffFill
                onClick={() => setIsShow(!isShow)}
                className="cursor-pointer"
                size={20}
              />
            )
          }
        />
        <Button
          variant="filled"
          color="indigo"
          className="uppercase mt-2 mb-1"
          onClick={handleSubmit}
          loading={loading}
        >
          Login
        </Button>
        <span className="text-sm mt-0">
          Don't have an account?
          <Link
            href={"/signup"}
            className="text-blue-500 cursor-pointer ml-1 font-bold"
          >
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Login;
