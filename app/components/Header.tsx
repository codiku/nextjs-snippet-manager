import Image from "next/image";
import logoPng from "/public/logo.png";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="bg-main-700 px-8 py-8 flex justify-between">
      <Link href="/">
        <Image src={logoPng} alt="Logo" />
      </Link>
      <div className="flex items-center space-x-3">
        <UserButton
          afterSignOutUrl={"/sign-in"}
          afterSwitchSessionUrl="/sign-in"
        />
      </div>
    </header>
  );
}
