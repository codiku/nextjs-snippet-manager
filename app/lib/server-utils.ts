import { NextRequest } from "next/server";

export function getQueryParams<T>(req: NextRequest) {
  return Object.fromEntries(req.nextUrl.searchParams) as T;
}
