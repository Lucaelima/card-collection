import { ICardsCollection } from "./ICardsCollection";

export interface IProfile {
  id: string;
  username: string;
  avatar_path?: string | null;
  avatarUrl?: string | undefined;
  favorite_collection_id?: string;
  favoriteCollection?: ICardsCollection | null;
};