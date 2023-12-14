import logoAuthPng from "/public/logo.png";
import Image from "next/image";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between h-screen w-screen ">
      <div className="flex-1 flex justify-center items-center">{children}</div>
      <div className="space-y-4 flex-1 flex flex-col items-center bg-main-700 h-full justify-center rounded-bl-[8rem] shadow-2xl">
        <Image src={logoAuthPng} alt="Logo" />
        <div className="text-2xl text-white">
          The one place for all your code snippets
        </div>
      </div>
    </div>
  );
}
