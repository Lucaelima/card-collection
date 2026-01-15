// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password) return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const supabaseAdmin = createServerSupabaseClient();

  try {
    const fakeEmail = `${username.toLowerCase()}@internal.local`;
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: fakeEmail,
      password,
      email_confirm: true,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // insert profile
    const { error: profileErr } = await supabaseAdmin
      .from("profiles")
      .insert({ id: data.user.id, username: username.toLowerCase() });

    if (profileErr) return NextResponse.json({ error: profileErr.message }, { status: 400 });

    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Erro no endpoint:", err);
    return NextResponse.json({ error: errorMessage || "Internal" }, { status: 500 });
  }
}
