"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"

export default function AuthProfileMenu() {
    const {data,status } = useSession();

    console.log(data)
    const isAuth = status === "authenticated";

    if (isAuth) {   
        return (
            <p>
                {data?.user?.name}
                <button onClick={() => signOut()}>logout</button>
            </p>
        );
    }


    return (
        <ul className="flex items-center space-x-6">
            <li>
                <Link href="/auth/sign-in">Login</Link>
            </li>
            <li className="bg-blue-800 py-2 px-3 text-white rounded-md">
                <Link href="/auth/sign-up">register</Link>
            </li>
        </ul>
    );
}