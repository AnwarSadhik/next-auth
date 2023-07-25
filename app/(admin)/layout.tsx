import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode
}

export default async function AdminLayout({children} : Props) {
    const session = getServerSession(authOptions);

    const user = session?.user as { role: string } | undefined;
    const isAdmin = user?.role === "admin";

    if (!isAdmin) redirect("/auth/sign-in")

    return <>{children}</>
}
