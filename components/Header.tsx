"use client"

import AuthProfileMenu from "./AuthProfile"

export default function Header() {
  return (
    <nav className="flex justify-between items-center py-2 px-14 mt-2">
        <div className="logo">
            LOGO
        </div>
        <AuthProfileMenu />
    </nav>
  )
}
