"use client";
import { TbWorld } from "react-icons/tb";
import Image from "next/image";
import logoPng from "/public/logo.png";
import { UserButton } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { LOCALES } from "@/i18n";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export function Header(p: {}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname: string = usePathname();
  const signinPathWithLocale =
    "/" + locale + process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;

  const toggleLanguage = () => {
    router.push(
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
        <UserButton afterSignOutUrl={signinPathWithLocale} />
      </div>
    </header>
  );
}
