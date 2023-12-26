import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: (req) =>
    req.url.includes("/api/snippet") ||
    req.url.includes("/sign-in") ||
    req.url.includes("/sign-up"),
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
