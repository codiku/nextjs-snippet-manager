"use client";
import Image from "next/image";
import logoPng from "/public/logo.png";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { MouseEvent } from "react";
import { toast } from "sonner";
import { RxCopy } from "react-icons/rx";

export function Header() {
  const { userId } = useAuth();
  const copyUserIdToClipboard = () => {
    navigator.clipboard.writeText(userId!);
    toast("userId copied to clipboard");
  };

  return (
    <header className="bg-main-700 px-8 py-8 flex justify-between">
      <Link href="/">
        <Image src={logoPng} alt="Logo" className="w-48" />
      </Link>
      <div className="flex items-center space-x-3 text-white">
        <UserButton afterSignOutUrl="/auth/sign-in" />
        <div
          className="cursor-pointer flex justify-center items-center"
          onClick={copyUserIdToClipboard}
        >
          <div className="w-5 h-5">
            <RxCopy />
          </div>
          {userId?.slice(0, 10) + "..."}
        </div>
      </div>
    </header>
  );
}
