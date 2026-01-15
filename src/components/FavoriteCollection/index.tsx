import { useRef } from "react";
import { BookHeart } from "lucide-react";
import { FavoriteCollectionContainer, UserFavoriteCollection } from "./styles";
import CardsCollection from "../CardsCollection";
import { useAuthStore } from "@/store/authStore";
import { ModalRef } from "@/types/ModalRef";
import FavoriteCollectionEdit from "../FavoriteCollectionEdit";
import ComponentAlert from "../ComponentAlert";

const FavoriteCollection = () => {
    const profile = useAuthStore((s) => s.profile);
    const favorite = profile?.favoriteCollection;
    const FavoriteCollectionEditRef = useRef<ModalRef>(null as unknown as ModalRef);
    console.log("favoriteCollection", favorite);
    return (
        <FavoriteCollectionContainer>
            <h2>Coleção Favorita</h2>
            <UserFavoriteCollection>
                {favorite ? (
                    <CardsCollection
                        key={favorite.id}
                        {...favorite}
                    />
                ) : (
                    <ComponentAlert>
                        <p>
                            Não há nehuma coleção favorita.
                        </p>
                        <a onClick={() => FavoriteCollectionEditRef.current?.open()}>
                            <BookHeart />
                            Adicionar coleção favorita
                        </a>
                    </ComponentAlert>
                )}
            </UserFavoriteCollection>
            {favorite && (
                <a onClick={() => FavoriteCollectionEditRef.current?.open()}>
                    <BookHeart />
                    Alterar coleção favorita
                </a>
            )}
            <FavoriteCollectionEdit modalRef={FavoriteCollectionEditRef} favorite={favorite} />
        </FavoriteCollectionContainer>
    )
}

export default FavoriteCollection;