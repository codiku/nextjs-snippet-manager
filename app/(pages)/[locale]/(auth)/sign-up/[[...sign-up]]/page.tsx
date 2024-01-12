import { SignUp } from "@clerk/nextjs";
import { useLocale } from "next-intl";

export default function SignupPage() {
  const locale = useLocale();
  return (
    <SignUp path={"/" + locale + process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL} />
  );
}
