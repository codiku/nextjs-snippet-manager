import Image from "next/image";
import logoPng from "/public/logo.png";
import userPng from "/public/user.png";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function Header() {
  return (
    <header className="bg-main-700 px-8 py-8 flex justify-between">
      <Link href="/">
        <Image src={logoPng} alt="Logo" />
      </Link>
      <div className="flex items-center space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex space-x-4 items-center">
            <Image src={userPng} alt="user icon" />
            <span>Robin Lebhar</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-black p-2 rounded-md shadow-lg">
            <DropdownMenuCheckboxItem>Logout</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
