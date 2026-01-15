import { supabaseServer } from "@/lib/auth";

export async function POST(request: Request) {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();

  const { data: inserted, error } = await supabase
    .from("card_collections")
    .insert({
      name: body.name,
      description: body.description,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }

  return Response.json(inserted);
}