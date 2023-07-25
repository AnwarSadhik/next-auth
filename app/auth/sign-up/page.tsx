"use client";
import Link from "next/link";
import { useState, ChangeEventHandler, FormEventHandler } from "react";

const SignUp = () => {
  const [busy,setBusy] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setBusy(true);
    e.preventDefault();
    const res = await fetch(`/api/auth/users`,{
      method: 'POST',
      body: JSON.stringify(userData),
    })

    const data = await res.json();
    console.log(data)
    setBusy(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-96 p-6 bg-white" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your name"
            required
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your email"
            required
            value={userData.email}
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
          I am a user,{" "}
          <Link href="/auth/sign-in" className=" text-blue-400">
            Sign In
          </Link>
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
          style={{ opacity: busy ? 0.5 : 1 }}
          // onClick={handleSubmit}
          disabled={busy}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
