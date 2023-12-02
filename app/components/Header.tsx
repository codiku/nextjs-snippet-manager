"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import logoPng from "/public/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
export function Header() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  function showLogoutDialog() {
    if (window.confirm("You are leaving ?")) {
      router.push("/api/auth/logout");
    }
  }
  return (
    <header className="bg-main-700 px-8 py-8 flex justify-between">
      <Link href="/">
        <Image src={logoPng} alt="Logo" />
      </Link>
      {user && (
        <div
          onClick={showLogoutDialog}
          className="cursor-pointer flex items-center space-x-3"
        >
          <img
            height={96}
            width={96}
            className="w-5 h-5"
            src={user.picture || ""}
            alt={"User name"}
          />
          <h2>{user.email}</h2>
        </div>
      )}
    </header>
  );
}
