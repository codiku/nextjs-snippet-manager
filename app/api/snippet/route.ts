import { NextRequest, NextResponse } from "next/server";
import { createSnippet, readAllSnippet } from "./service";
import { Snippet } from "@prisma/client";

export async function GET(req: NextRequest) {
  //const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const filters: Partial<Snippet> = Object.fromEntries(
    req.nextUrl.searchParams
  );

  return NextResponse.json(await readAllSnippet(filters));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(await createSnippet(body));
}
