import Image from "next/image";
import logoAuthPng from "/public/logo.png";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex justify-center items-center">{children}</div>
      <div className="flex-1 flex flex-col space-y-4 items-center bg-main-700 justify-center shadow-2xl rounded-bl-[8rem]">
        <Image src={logoAuthPng} alt="Logo" />
        <div className="text-2xl text-white">
          The one place for all your code snippets
        </div>
      </div>
    </div>
  );
}
