import { IYuGiOh } from "@/types/ICards"
import { create } from "zustand";

type CardStore = {
    cards: IYuGiOh[];
    loading: boolean;
    error: string | null;
    fetchYuGiOhCards: () => Promise<void>;
};

export const useCardStore = create<CardStore>((set) => ({
    cards: [],
    loading: false,
    error: null,

    fetchYuGiOhCards: async () => {
        set({ loading: true, error: null });
        try {
            const res = await fetch("/api/cards/yu-gi-oh");
            const data: { cards: IYuGiOh[] } = await res.json();

            set({ cards: data.cards, loading: false });
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Erro ao buscar cartas:", err.message);
            }
            set({ error: "Erro ao buscar cartas", loading: false });
        }
        
    }
}))