import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  //console.log("*** body", body);
  console.log("***");
  console.log("*** req ", params);
  return NextResponse.json({ message: "sign up ok" });
}
