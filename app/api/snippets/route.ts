import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const snippets = await db.snippet.findMany();
  return NextResponse.json(snippets);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const snippetCreated = await db.snippet.create({ data: body });
    return NextResponse.json(snippetCreated);
  } catch (err) {
    return NextResponse.json(
      { error: "Could not create the snippet" },
      { status: 400 }
    );
  }
}
