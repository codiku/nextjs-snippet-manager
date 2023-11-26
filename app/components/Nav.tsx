import { PROG_LNG } from "@/constant";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <div className="bg-main-900  py-8 px-6 w-64 text-sm rounded-lg flex items-center justify-center">
      <ul className="space-y-4  ">
        {Object.values(PROG_LNG).map((progLang) => (
          <li key={progLang.name}>
            <Link
              href={`/snippets/${progLang.name}`}
              className="flex items-center gap-4 "
            >
              <Image
                src={progLang.src}
                alt={progLang.name}
                width={30}
                height={30}
              />
              <span>{progLang.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Nav };
