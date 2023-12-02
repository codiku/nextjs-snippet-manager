import { SearchBar } from "@/components/SearchBar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function Home() {
    return (
      <main>
        <SearchBar />
      </main>
    );
  },
  { returnTo: "/" }
);
