import { supabase } from "@/lib/supabase";
import { IProfile } from "@/types/IProfile";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: User | null;
  profile: IProfile | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  setProfile: (profile: IProfile | null) => void;
  loadProfile: (userId: string) => Promise<void>;
  logoutLocal: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      isAuthenticated: false,

      setUser: (user) => {
        if (!user) {
          set({
            user: null,
            profile: null,
            isAuthenticated: false,
          });
        } else {
          set({
            user,
            isAuthenticated: true,
          });
        }
      },

      setProfile: (profile) => {
        set({ profile });
      },
      
      loadProfile: async (userId) => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error || !data) {
          console.error("Error loading profile:", error);
          return;
        }

        let favoriteCollection = null;

        if (data.favorite_collection_id) {
          const { data: favData } = await supabase
            .from("card_collections")
            .select("*")
            .eq("id", data.favorite_collection_id)
            .single();

          favoriteCollection = favData || null;
        }

        let avatarUrl: string | undefined;

        if (data.avatar_path) {
          const { data: urlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(data.avatar_path);

          avatarUrl = `${urlData.publicUrl}?v=${Date.now()}`;
        }

        set({
          profile: {
            ...data,
            avatarUrl,
            favoriteCollection,
          },
        });
      },

      logoutLocal: () =>
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-store",
    }
  )
);
