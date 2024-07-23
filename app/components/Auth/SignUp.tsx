"use client";
import { Button, Input, TextInput } from "@mantine/core";
// import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiEyeFill } from "@remixicon/react";
import { RiEyeOffFill } from "@remixicon/react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase";
import useSignUpUser from "@/app/_hooks/useSignUpUser";
import toast from "react-hot-toast";
interface signupCredential {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUp = () => {
  const initialState: signupCredential = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [isShow, setIsShow] = useState<boolean>(true);
  const [signupData, setSignupData] = useState<signupCredential>(initialState);
  const [correctPassword, setCorrectPassword] = useState(false);
  const { loading, handleCreateUser } = useSignUpUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      const validValue = value.replace(/[0-9]/g, "");
      setSignupData((prev) => {
        return { ...prev, [name]: validValue };
      });
    } else {
      setSignupData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };
  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      toast.error("Please provide a valid email address");
      return;
    }
    if (signupData.password != signupData.confirm_password) {
      return;
    }
    await handleCreateUser(
      signupData.email,
      signupData.password,
      signupData.name
    );
    setSignupData(initialState);
  };

  return (
    <div className=" h-full flex justify-center items-center ">
      <div className="flex  flex-col  border-[1px] rounded-md w-[90%] sm:w-[35%] px-4 py-6 shadow-sm sm:shadow-md">
        <h1 className="text-center uppercase text-2xl text-blue-600 font-bold  ">
          signup
        </h1>
        <TextInput
          label="Name"
          placeholder="Enter name"
          type="text"
          value={signupData.name}
          name="name"
          onChange={handleChange}
        />
        <TextInput
          label="Email"
          placeholder="Enter email"
          type="email"
          value={signupData.email}
          name="email"
          onChange={handleChange}
        />
        <TextInput
          label="Password"
          placeholder="Enter password"
          type={isShow ? "text" : "password"}
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
          value={signupData.password}
          name="password"
          onChange={handleChange}
        />
        <TextInput
          label="Conform_Password"
          placeholder="Enter confirm password"
          type="text"
          value={signupData.confirm_password}
          name="confirm_password"
          onChange={handleChange}
          onClick={() => setCorrectPassword(true)}
          required
        />
        {correctPassword &&
          signupData.password != signupData.confirm_password && (
            <span className="text-red-500 text-sm font-medium">
              password should be match
            </span>
          )}

        <Button
          variant="filled"
          color="indigo"
          className="uppercase mt-2 mb-1"
          onClick={handleSubmit}
          loading={loading}
        >
          SignUp
        </Button>
        <span className="text-sm ">
          Already have an account?
          <Link
            href={"/login"}
            className="text-blue-500 cursor-pointer font-bold"
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};
export default SignUp;
