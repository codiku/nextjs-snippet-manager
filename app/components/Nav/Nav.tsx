import { SNIPPETS_METADATA, SnippetMetada } from "@/app/constant";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const renderLinkItem = (snippetMetadata: SnippetMetada) => (
    <li
      key={snippetMetadata.technology}
      className="transition transform hover:scale-125"
    >
      <Link
        href={`/snippets/technology/${snippetMetadata.technology}`}
        className="flex items-center gap-4 font-semibold"
      >
        <Image
          src={snippetMetadata.src}
          alt={"Icon for " + snippetMetadata.label}
          width={30}
          height={30}
        />
        <span>{snippetMetadata.label}</span>
      </Link>
    </li>
  );
  return (
    <div className="text-white bg-main-900 py-8 px-6  text-sm rounded-lg ">
      <ul className="space-y-4">
        {Object.values(SNIPPETS_METADATA).map(renderLinkItem)}
      </ul>
    </div>
  );
};

export { Nav };
