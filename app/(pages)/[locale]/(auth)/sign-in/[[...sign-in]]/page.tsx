import { SignIn } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export default function SigninPage() {
  const locale = useLocale();
  const t = useTranslations("auth.sign-in");
  return (
    <div>
      <h1>{t("title")}</h1>
      <SignIn path={"/" + locale + process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
    </div>
  );
}
