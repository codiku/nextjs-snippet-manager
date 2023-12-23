import { NextRequest, NextResponse } from "next/server";
import {
  deleteSnippet,
  readSnippet,
  readSnippetSchema,
  updateSnippet,
} from "./service";
import { getQueryParams } from "@/lib/server-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const queryParams = getQueryParams(req) as typeof readSnippetSchema._type;
  return NextResponse.json(await readSnippet(Number(params.id), queryParams));
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
