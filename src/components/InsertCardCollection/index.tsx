import { IYuGiOh } from "@/types/ICards";
import { Modal } from "../Modal"
import { ModalRef } from "@/types/ModalRef";
import SearchBar from "../SearchBar";
import { RefObject, useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useCollectionStore } from "@/store/collectionStore";
import { CardCollections, CardsCollectionsSelected, CardViewContainer, CollectionSelectContainer, ExcludeButton, SelectedCollectionsContainer } from "./styles";
import { ICardsCollection } from "@/types/ICardsCollection";
import { X } from "lucide-react";
import { Button } from "../Button";
import Form from "../Form";
import { useForm } from "react-hook-form";
import CardView from "../CardView";
import ComponentAlert from "../ComponentAlert";
import Loader from "../Loader";

type InsertCardCollectionProps = {
    modalRef: RefObject<ModalRef>;
    cardData: IYuGiOh;
    cardType: "Yu-Gi-Oh!";
};

const InsertCardCollection = ({ modalRef, cardData, cardType }: InsertCardCollectionProps) => {
    const userId = useAuthStore((s) => s.user?.id);
    const { collections, loading, error, fetchCollections, updateCollection } = useCollectionStore();
    const [searchValue, setSearchValue] = useState("");
    const [selectedCollections, setSelectedCollections] = useState<ICardsCollection[]>([]);

    const {
        handleSubmit,
        reset,
    } = useForm<ICardsCollection[]>();

    const collectionHasCard = (collection: ICardsCollection) => {
        return collection.cards?.some(
            (card) => card.data.id === cardData.id
        );
    };

    const nameFilteredCollections = collections.filter(collection =>
        collection.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const collectionsWithCard = nameFilteredCollections.filter(collection =>
        collectionHasCard(collection)
    );

    const collectionsWithoutCard = nameFilteredCollections.filter(collection =>
        !collectionHasCard(collection)
    );


    const addSelectedCollection = useCallback((collection: ICardsCollection) => {
        setSelectedCollections((prev) => {
            const exists = prev.find((c) => c.id === collection.id);
            if (exists) return prev.filter((c) => c.id !== collection.id);
            return [...prev, collection];
        });
    }, []);

    const removeSelectedCollection = useCallback((collectionId: string) => {
        setSelectedCollections((prev) =>
            prev.filter((c) => c.id !== collectionId)
        );
    }, []);

    const onSubmit = async () => {
        if (!userId) {
            alert("Usuário não autenticado.");
            return;
        }

        try {
            for (const collection of selectedCollections) {
                if (collectionHasCard(collection)) continue;

                const updatedCards = [
                    ...(collection.cards || []),
                    {
                        cardName: cardData.name,
                        cardImage: cardData.image_url,
                        cardType: cardType,
                        data: cardData,
                    },
                ];

                await updateCollection(
                    collection.id,
                    collection.name,
                    updatedCards
                );
            }


            reset();
            setSelectedCollections([]);
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
            <h2>Inserir a carta &quot;{cardData.name}&quot; em coleções</h2>
            <CardViewContainer>
                <CardView
                    image={cardData.image_url ? cardData.image_url : ""}
                    name={cardData.name}
                    card={cardData}
                    cardType={cardType}
                />
            </CardViewContainer>
            {collectionsWithCard.length > 0 && (
                <CollectionSelectContainer>
                    <strong>
                        Esta carta já está em ({collectionsWithCard.length}):
                    </strong>

                    {collectionsWithCard.map((collection) => (
                        <span key={collection.id}>
                            {collection.name}
                        </span>
                    ))}
                </CollectionSelectContainer>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <CollectionSelectContainer>
                    <label>Selecionar  coleções</label>
                    <SearchBar
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSubmit={() => setSearchValue(searchValue)}
                    />
                    <CardCollections>
                        <strong>
                            Coleções disponíveis ({collectionsWithoutCard.length}):
                        </strong>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <div> {error}</div>
                        ) : (
                            <>
                                {
                                    collectionsWithoutCard.length > 0 ? (
                                        collectionsWithoutCard.map((collection) => (
                                            <span
                                                key={collection.id}
                                                onClick={() => addSelectedCollection(collection)}
                                            >
                                                {collection.name}
                                            </span>
                                        ))
                                    ) : (
                                        <ComponentAlert>
                                            <p>
                                                Nehuma coleção encontrada.
                                            </p>
                                        </ComponentAlert>
                                    )
                                }
                            </>
                        )}
                    </CardCollections>
                </CollectionSelectContainer>
                <CollectionSelectContainer>
                    <CardsCollectionsSelected>
                        <strong>Coleções onde vai inserir ({selectedCollections.length}):</strong>
                        {selectedCollections.length === 0 ? (
                            <div>Nenhuma</div>
                        ) : (
                            <SelectedCollectionsContainer>
                                {selectedCollections.map((c) => (
                                    <div key={c.id} className="form-row">
                                        {c.name}
                                        <ExcludeButton
                                            type="button"
                                            onClick={() => removeSelectedCollection(c.id)}
                                        >
                                            <X />
                                        </ExcludeButton>
                                    </div>
                                ))}
                            </SelectedCollectionsContainer>
                        )}
                    </CardsCollectionsSelected>
                </CollectionSelectContainer>
                <div className="form-row">
                    <Button
                        $variant="gray"
                        onClick={() => {
                            reset();
                            modalRef.current?.close();
                        }}
                        type="button"
                    >
                        Cancelar
                    </Button>
                    <Button $variant="orange" type="submit">
                        Salvar
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default InsertCardCollection;