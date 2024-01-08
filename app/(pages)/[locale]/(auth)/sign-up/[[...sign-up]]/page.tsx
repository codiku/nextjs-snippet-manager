import { SignUp } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";

export default function SignupPage() {
  const locale = useLocale();
  const signupPathWithLocale =
    "/" + locale + process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL;
  return <SignUp path={signupPathWithLocale} />;
}
