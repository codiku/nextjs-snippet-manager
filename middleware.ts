import { authMiddleware } from "@clerk/nextjs";

import createMiddleware from "next-intl/middleware";
import { LOCALES } from "./i18n";
const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth(request) {
    if (!request.url.includes("/api")) {
      return intlMiddleware(request);
    }
  },
  publicRoutes: ["/:locale/sign-in", "/:locale/sign-up", "/api/:path*"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
