import Image from "next/image";
import logoAuthPng from "/public/logo.png";
import { useTranslations } from "next-intl";
export default function AuthLayout(p: { children: React.ReactNode }) {
  const t = useTranslations("auth");
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex justify-center items-center">
        {p.children}
      </div>
      <div className="flex-1 flex flex-col space-y-4 items-center bg-main-700 justify-center shadow-2xl rounded-bl-[8rem]">
        <Image src={logoAuthPng} alt="Logo" />
        <div className="text-2xl text-white">{t("subtitle")}</div>
      </div>
    </div>
  );
}
