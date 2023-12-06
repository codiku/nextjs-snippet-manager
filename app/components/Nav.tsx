import { PROG_LNG } from "@/constant";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <div className="bg-main-900 py-8 px-6  min-w-[12rem] text-sm rounded-lg flex h-full  justify-center">
      <ul className="space-y-4">
        {Object.values(PROG_LNG).map((progLang) => (
          <li
            key={progLang.name}
            className="transition transform hover:scale-125"
          >
            <Link
              href={`/snippets/language/${progLang.name}`}
              className="flex items-center gap-4 "
            >
              <Image
                src={progLang.src}
                alt={progLang.label}
                width={30}
                height={30}
              />
              <span>{progLang.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Nav };
