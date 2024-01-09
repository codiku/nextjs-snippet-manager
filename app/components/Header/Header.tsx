"use client";
import { TbWorld } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import logoPng from "/public/logo.png";
import { UserButton } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const locale = useLocale();
  const router = useRouter();
  const pathname: string = usePathname();

  const toggleLanguage = () => {
    router.replace(
      (locale === "en" ? "/fr" : "/en") + pathname.split("/" + locale)[1]
    );
  };
  return (
    <header className="bg-main-700 p-8 flex justify-between items-center">
      <Link href="/">
        <Image src={logoPng} alt="Logo" className="w-48" />
      </Link>
      <div className="flex items-center justify-center space-x-12">
        <TbWorld
          onClick={toggleLanguage}
          className="text-white hover:text-white/80 cursor-pointer"
        />
        <UserButton
          afterSignOutUrl={
            "/" + locale + process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL
          }
        />
      </div>
    </header>
  );
}
