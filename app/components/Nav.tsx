import { TECHNO_MAPPER } from "@/constant";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <div className="text-white bg-main-900 py-8 px-6  min-w-[12rem] text-sm rounded-lg flex h-full  justify-center">
      <ul className="space-y-4">
        {Object.values(TECHNO_MAPPER).map((technoItem) => (
          <li
            key={technoItem.technology}
            className="transition transform hover:scale-125"
          >
            <Link
              href={`/snippets/technology/${technoItem.technology}`}
              className="flex items-center gap-4 font-semibold"
            >
              <Image
                src={technoItem.src}
                alt={technoItem.label}
                width={30}
                height={30}
              />
              <span>{technoItem.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Nav };
