import { TECHNO_MAPPER, TechnoItem } from "@/constant";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const renderLinkItem = (technoItem: TechnoItem) => (
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
  );
  return (
    <div className="text-white bg-main-900 py-8 px-6  min-w-[12rem] text-sm rounded-lg flex h-full  justify-center">
      <ul className="space-y-4">
        {Object.values(TECHNO_MAPPER).map(renderLinkItem)}
      </ul>
    </div>
  );
};

export { Nav };
