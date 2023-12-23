import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/response";
import { Snippet } from "@prisma/client";
import {
  createSnippet,
  readAllSnippet,
  readAllSnippetsSchema,
} from "./service";
import { getQueryParams } from "@/lib/server-utils";

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Snippet[]>>> {
  const queryParams = getQueryParams<typeof readAllSnippetsSchema._type>(req);
  return NextResponse.json(await readAllSnippet(queryParams));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(await createSnippet(body));
}
