import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { DEFAULT_LOCALE, LOCALES } from "./i18n";

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
export default authMiddleware({
  beforeAuth(request) {
    if (!request.url.includes("/api/")) {
      return intlMiddleware(request);
    }
  },

  publicRoutes: ["/:locale/sign-in", "/:locale/sign-up", "/api/:path*"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
