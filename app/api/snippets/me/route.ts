import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/response";
import { Snippet } from "@prisma/client";
import { fetchSnippetCurrUser } from "./action";

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Snippet[]>>> {
  return NextResponse.json(await fetchSnippetCurrUser());
}
