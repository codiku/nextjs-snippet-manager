import { db } from "@/lib/db";
import { Snippet } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { deleteSnippet } from "./actions";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(await deleteSnippet(Number(params.id)));
}
