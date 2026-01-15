import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "./authStore";
import { ICardView } from "@/types/ICardView";

export type CardCollection = {
  id: string;
  name: string;
  cards: ICardView[];
  created_at: string;
  user_id: string;
};

type State = {
  collections: CardCollection[];
  loading: boolean;
  error: string | null;

  fetchCollections: () => Promise<void>;
  createCollection: (name: string, cards: ICardView[]) => Promise<void>;
  updateCollection: (id: string, name: string, cards: ICardView[]) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
};

export const useCollectionStore = create<State>((set) => ({
  collections: [],
  loading: false,
  error: null,

  fetchCollections: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true, error: null });

    const { data, error } = await supabase
      .from("card_collections")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) return set({ error: error.message, loading: false });

    set({ collections: data ?? [], loading: false });
  },

  createCollection: async (name: string, cards: ICardView[]) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true, error: null });

    const { data, error } = await supabase
      .from("card_collections")
      .insert({ 
        name, 
        cards,
        user_id: user.id
      }) 
      .select()
      .single();

    if (error) return set({ error: error.message, loading: false });

    set((s) => ({
      collections: [data, ...s.collections],
      loading: false
    }));
  },

  updateCollection: async (id: string, name: string, cards: ICardView[]) => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("card_collections")
      .update({ 
        cards,
        name 
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return set({ error: error.message, loading: false });

    set((s) => ({
      collections: s.collections.map((c) =>
        c.id === id ? data! : c
      ),
      loading: false
    }));
  },

  deleteCollection: async (id: string) => {
    set({ loading: true });

    const { error } = await supabase
      .from("card_collections")
      .delete()
      .eq("id", id);

    if (error) return set({ error: error.message, loading: false });

    set((s) => ({
      collections: s.collections.filter((c) => c.id !== id),
      loading: false
    }));
  }
}));
