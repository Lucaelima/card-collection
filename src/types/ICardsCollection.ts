import { ICardView } from "./ICardView";

export interface ICardsCollection {
    id: string;
    name: string;
    cards: ICardView[];
}