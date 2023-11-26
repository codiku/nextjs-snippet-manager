import Image from "next/image";
import logo from "/public/logo.png";

export function Header() {
  return (
    <header className="bg-main-700 px-8 py-8 ">
      <Image src={logo} alt="Logo" />
    </header>
  );
}
