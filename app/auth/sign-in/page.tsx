"use client"
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [userData,setUserData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter();
  const handleChange:React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
      const { name, value } = target;

      setUserData({
        ...userData,
        [name]: value
      })
  }


  const handleSubmit:React.FormEventHandler<HTMLFormElement> = async(e) => {
      e.preventDefault();
      const res = await signIn("credentials",{
        email: userData.email,
        password: userData.password,
        redirect: false,
      });
      if (res?.error) alert(res.error);
      router.replace("/profile")
  };

  console.log(userData);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-96 p-6 bg-white" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={userData.password}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
            required
            onChange={handleChange}
          />
        </div>
        <p className="mb-4">
          I am new, <Link href="/auth/sign-up" className=" text-blue-400">Sign Up</Link>
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
