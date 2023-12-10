import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/response";
import { Snippet } from "@prisma/client";
import { fetchSnippetsByUser } from "./service";

// zod todo

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Snippet[]>>> {
  const { userId } = getAuth(req);
  try {
    const resp = await fetchSnippetsByUser(userId!);
    return NextResponse.json({ data: resp });
  } catch (err) {
    return NextResponse.json({
      error: true,
      message: "Could not find any snippet for this user",
    });
  }
}
