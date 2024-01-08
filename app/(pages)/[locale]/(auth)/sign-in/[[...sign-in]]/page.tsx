import { SignIn } from "@clerk/nextjs";
import { useLocale } from "next-intl";
export default function SigninPage() {
  const locale = useLocale();
  return (
    <SignIn path={"/" + locale + process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
  );
}
