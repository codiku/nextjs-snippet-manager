/*import { NextRequest } from "next/server";

import { authMiddleware } from "@clerk/nextjs";

export default async function middlewares(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (pathname.match("/api/*")) {
    console.log("Calling api...", pathname);
  } else if (pathname.match("/snippets/*")) {
    console.log("Navigation on ... ", pathname);
  }
  //@ts-ignore
 // return authMiddleware({})(req);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
// evrything but .something and  not containing _next,
// exactly /
// /api or /trpc with extra string after
*/

import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    const pathname = req.nextUrl.pathname;
    if (pathname.match("/api/*")) {
      console.log("Calling api...", pathname);
    } else if (pathname.match("/snippets/*")) {
      console.log("Navigation on ... ", pathname);
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
