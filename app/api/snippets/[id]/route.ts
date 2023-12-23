import { NextRequest, NextResponse } from "next/server";
import { deleteSnippet, readSnippet, updateSnippet } from "./service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(await readSnippet(Number(params.id)));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  return NextResponse.json(await updateSnippet(Number(params.id), body));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(await deleteSnippet(Number(params.id)));
}
