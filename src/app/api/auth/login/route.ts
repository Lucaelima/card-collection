import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const result = await loginUser(username, password);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Erro no endpoint:", err);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}