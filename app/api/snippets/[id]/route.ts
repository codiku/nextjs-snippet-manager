import { db } from "@/lib/db";
import { Snippet } from "@prisma/client";
import { NextPageContext } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fieldsToUpdate = (await req.json()) as Partial<Omit<Snippet, "id">>;

    const updatedSnippet = await db.snippet.update({
      where: { id: Number(params.id) },
      data: fieldsToUpdate,
    });

    return NextResponse.json(updatedSnippet);
  } catch (err) {
    return NextResponse.json(
      { error: "Couldn't update snippet" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedSnippet = await db.snippet.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(deletedSnippet);
  } catch (err) {
    return NextResponse.json(
      { error: "Couldn't delete snippet" },
      { status: 400 }
    );
  }
}
