import { NextResponse } from "next/server";
import { readAllSnippet } from "./service";

export async function GET() {
  return NextResponse.json(await readAllSnippet());
}

export async function POST() {
  return NextResponse.json({ data: "Hello" });
}
