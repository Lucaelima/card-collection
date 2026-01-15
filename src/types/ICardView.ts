import { IYuGiOh } from "./ICards";

export type ICardView = {
    cardName: string, 
    cardImage: string | null; 
    cardType: "Yu-Gi-Oh!", 
    data: IYuGiOh,
};