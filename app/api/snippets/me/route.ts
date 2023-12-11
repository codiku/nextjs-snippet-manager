import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/response";
import { Snippet } from "@prisma/client";
import { readAllMySnippet } from "./actions";

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Snippet[]>>> {
  return NextResponse.json(await readAllMySnippet());
}
