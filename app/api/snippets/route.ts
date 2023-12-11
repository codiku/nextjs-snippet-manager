import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/response";
import { Snippet } from "@prisma/client";
import { createSnippet, readAllSnippet } from "./actions";

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Snippet[]>>> {
  return NextResponse.json(await readAllSnippet());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(await createSnippet(body));
}
