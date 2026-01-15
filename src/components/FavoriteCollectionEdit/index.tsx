import { useCollectionStore } from "@/store/collectionStore";
import { useAuthStore } from "@/store/authStore";
import { ModalRef } from "@/types/ModalRef";
import Form from "../Form"
import { Modal } from "../Modal"
import { RefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { ICardsCollection } from "@/types/ICardsCollection";
import { CollectionData, CollectionHeader, Collections, CollectionSelectContainer } from "./styles";
import SearchBar from "../SearchBar";
import ComponentAlert from "../ComponentAlert";
import Carousel from "../Carousel";
import CardView from "../CardView";
import { ChevronDown, ChevronUp } from "lucide-react";
import { updateFavoriteCollection } from "@/services/userService";
import Loader from "../Loader";

type FavoriteCollectionEditProps = {
    modalRef: RefObject<ModalRef>;
    favorite?: ICardsCollection | null;
};

const FavoriteCollectionEdit = ({ modalRef, favorite }: FavoriteCollectionEditProps) => {
    const userId = useAuthStore((s) => s.user?.id);
    const { collections, loading, error, fetchCollections } = useCollectionStore();
    const [selectedCollection, setSelectedCollection] = useState<string>(favorite?.id ?? "");
    const [openCollection, setOpenCollection] = useState<string>();
    const [searchValue, setSearchValue] = useState("");
    const { handleSubmit } = useForm();
    const carouselRef = useRef<HTMLDivElement>(null!);

    const nameFilteredCollections = collections.filter(collection =>
        collection.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const onSubmit = async () => {
        if (!userId) {
            alert("Usuário não autenticado");
            return;
        }

        if (!selectedCollection) {
            alert("Selecione uma coleção primeiro");
            return;
        }

        try {
            await updateFavoriteCollection(selectedCollection);

            modalRef.current?.close();
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Ocorreu um erro ao criar.");
            }
        }
    }

    useEffect(() => {
        if (userId) {
            fetchCollections();
        }
    }, [userId, fetchCollections]);

    return (
        <Modal ref={modalRef}>
            <h2>Editar Coleção Favorita do Usúario</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <CollectionSelectContainer>
                    <SearchBar
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSubmit={() => setSearchValue(searchValue)}
                    />
                    <Collections>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <div> {error}</div>
                        ) : (
                            nameFilteredCollections.length === 0 ? (
                                <ComponentAlert>
                                    <p>
                                        Nenhuma carta encontrada.
                                    </p>
                                </ComponentAlert>
                            ) : (
                                nameFilteredCollections.map((collection) => (
                                    <CollectionData key={collection.id} $selected={selectedCollection === collection.id ? true : false}>
                                        <CollectionHeader>
                                            <span onClick={() => setOpenCollection(collection.id !== openCollection ? collection.id : "")}>
                                                {collection.id !== openCollection ? (
                                                    <ChevronDown />
                                                ) : (
                                                    <ChevronUp />
                                                )}
                                            </span>
                                            <h2>{collection.name}</h2>
                                            <a onClick={() => setSelectedCollection(selectedCollection !== collection.id ? collection.id : "")}>
                                                Selecionar
                                            </a>
                                        </CollectionHeader>
                                        {collection.id === openCollection ?
                                            <Carousel scrollRef={carouselRef}>
                                                {collection.cards?.map((card) => (
                                                    <CardView
                                                        key={card.data.id}
                                                        image={card.cardImage ? card.cardImage : ""}
                                                        name={card.cardName}
                                                        card={card.data}
                                                        cardType={card.cardType}
                                                    />
                                                ))}
                                            </Carousel>
                                            : null
                                        }
                                    </CollectionData>
                                ))
                            )
                        )}
                    </Collections>
                </CollectionSelectContainer>
                <div className="form-row">
                    <Button
                        $variant="gray"
                        type="button"
                        onClick={() => {
                            setSelectedCollection(favorite?.id ?? "");
                            modalRef.current?.close();
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        $variant="orange"
                        type="submit"
                    >
                        Salvar
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default FavoriteCollectionEdit;