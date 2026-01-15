import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";

const FAKE_DOMAIN = "exemple.com";

export async function registerUser(
  username: string,
  password: string,
  avatar: File | undefined
) {
  const normalized = username.toLowerCase();
  const fakeEmail = `${normalized}@${FAKE_DOMAIN}`;

  const { error: signErr } = await supabase.auth.signUp({
    email: fakeEmail,
    password,
  });
  if (signErr) throw signErr;

  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData?.user) throw new Error("Erro ao confirmar criação do usuário");

  const user = userData.user;

  let avatarPath: string | null = null;

  if (avatar) {
    const ext = avatar.name.split(".").pop();
    const fileName = `${user.id}.${ext}`;

    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar, {
          upsert: true,
          contentType: avatar.type,
      });

    if (error) throw error;

    avatarPath = data.path;
  }

  const { data: existingProfile } = await supabase
  .from("profiles")
  .select("id")
  .eq("id", user.id)
  .maybeSingle();

  if (!existingProfile) {
    await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: normalized,
        avatar_path: avatarPath,
      });
  } else {
    await supabase
      .from("profiles")
      .update({
        username: normalized,
        avatar_path: avatarPath,
      })
      .eq("id", user.id);
  }

  const store = useAuthStore.getState();
  store.setUser(user);
  await store.loadProfile(user.id);
  return { user };
}

export async function loginUser(username: string, password: string) {
  const normalized = username.toLowerCase();
  const fakeEmail = `${normalized}@${FAKE_DOMAIN}`;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: fakeEmail,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error("Erro ao logar");

  const store = useAuthStore.getState();
  store.setUser(data.user);
  await store.loadProfile(data.user.id);

  return {
    user: data.user,
    session: data.session,
  };
}

export async function updateAvatar(avatar: File) {
  const store = useAuthStore.getState();
  const user = store.user;

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const ext = avatar.name.split(".").pop();
  const fileName = `${user.id}.${ext}`;
  const contentType = avatar.type || "image/png";

  const { data, error: uploadErr } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar, {
      upsert: true,
      contentType,
    });

  if (uploadErr) throw uploadErr;

  const avatarPath = data.path;

  const { error: profileErr } = await supabase
    .from("profiles")
    .update({ avatar_path: avatarPath })
    .eq("id", user.id);

  if (profileErr) throw profileErr;

  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(avatarPath);

  store.setProfile({
    ...store.profile!,
    avatar_path: avatarPath,
    avatarUrl: `${urlData.publicUrl}?v=${Date.now()}`,
  });

  return avatarPath;
}

export async function updateFavoriteCollection(collectionId: string | null) {
  const store = useAuthStore.getState();
  const user = store.user;

  if (!user) return;

  const { error } = await supabase
    .from("profiles")
    .update({ favorite_collection_id: collectionId })
    .eq("id", user.id);

  if (!error) {
    await store.loadProfile(user.id);
  }
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  useAuthStore.getState().logoutLocal();
}


export async function restoreSessionOnStart() {
  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user ?? null;
  const store = useAuthStore.getState();
  store.setUser(user);

  if (user) {
    await store.loadProfile(user.id);
  }
  return user;
}


export function subscribeToAuth() {
  return supabase.auth.onAuthStateChange( async (_event, session) => {
    const store = useAuthStore.getState();

    if (session?.user) {
      store.setUser(session.user);
      await store.loadProfile(session.user.id);
    } else {
      store.logoutLocal();
    }
  });
}
