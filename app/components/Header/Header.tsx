import Image from "next/image";
import Link from "next/link";
import logoPng from "/public/logo.png";
import { UserButton } from "@clerk/nextjs";
import { useLocale } from "next-intl";

export function Header(p: {}) {
  const locale = useLocale();
  return (
    <header className="bg-main-700 p-8 flex justify-between items-center">
      <Link href="/">
        <Image src={logoPng} alt="Logo" className="w-48" />
      </Link>
      <UserButton
        afterSignOutUrl={
          "/" + locale + process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL
        }
      />
    </header>
  );
}
