"use client"

import { useForm } from "react-hook-form";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { ModalRef } from "@/types/ModalRef";
import { Modal } from "../Modal";
import { Button } from "../Button";
import Form from "../Form";
import { ICardView } from "@/types/ICardView";
import SearchBar from "../SearchBar";
import { CardSelect, CardsView, CardsViewContainer, ColumnContainer, ExcludeButton, SelectedCards, SelectedCardsContainer } from "./styles";
import { useCardStore } from "@/store/cardStore";
import CardView from "../CardView";
import { ICardsCollection } from "@/types/ICardsCollection";
import { useAuthStore } from "@/store/authStore";
import { useCollectionStore } from "@/store/collectionStore";
import Carousel from "../Carousel";
import { X } from "lucide-react";
import ComponentAlert from "../ComponentAlert";
import Loader from "../Loader";

type CreateCardCollectionProps = {
    modalRef: RefObject<ModalRef>;
    collectionData?: ICardsCollection;
};
type CardGame = "Yu-Gi-Oh!";

const CreateCardCollection = ({ modalRef, collectionData }: CreateCardCollectionProps) => {
    const userId = useAuthStore((s) => s.user?.id);
    const { cards, loading, error, fetchYuGiOhCards } = useCardStore();
    const { createCollection, updateCollection } = useCollectionStore();
    const isEditing = !!collectionData;
    const [searchValue, setSearchValue] = useState("");
    const [selectedCardGame, setSelectedCardGame] = useState<CardGame>("Yu-Gi-Oh!");
    const [selectedCards, setSelectedCards] = useState<ICardView[]>([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const carouselRef = useRef<HTMLDivElement>(null!);
    const isLoadingRef = useRef(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ICardsCollection>();

    const handleScroll = () => {
        const el = carouselRef.current;
        if (!el || isLoadingRef.current) return;

        const { scrollLeft, clientWidth, scrollWidth } = el;

        if (scrollLeft + clientWidth >= scrollWidth - 100) {
            isLoadingRef.current = true;

            setVisibleCount((prev) => {
                const next = prev + 5;
                if (next >= nameFilteredCards.length) return prev;
                return next;
            });

            setTimeout(() => {
                isLoadingRef.current = false;
            }, 200);
        }
    }


    const toggleSelectCard = useCallback((card: ICardView) => {
        setSelectedCards((prev) => {
            const exists = prev.find((c) => c.data.id === card.data.id);
            if (exists) return prev.filter((c) => c.data.id !== card.data.id);
            return [...prev, card];
        });
    }, []);

    const removeSelectedCard = useCallback((cardId: number) => {
        setSelectedCards((prev) =>
            prev.filter((c) => c.data.id !== cardId)
        );
    }, []);

    const onSubmit = async (data: ICardsCollection) => {
        if (!userId) {
            alert("Usuário não autenticado.");
            return;
        }

        try {
            if (isEditing && collectionData?.id) {
                await updateCollection(
                    collectionData.id,
                    data.name,
                    selectedCards
                );
            } else {
                await createCollection(
                    data.name,
                    selectedCards
                );
            }
            reset();
            setSelectedCards([]);
            modalRef.current?.close();
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Ocorreu um erro ao criar.");
            }
        }
    };

    const nameFilteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        if (selectedCardGame === "Yu-Gi-Oh!") {
            if (!cards || cards.length === 0) {
                fetchYuGiOhCards();
            }
        }
    }, [selectedCardGame, fetchYuGiOhCards, cards]);

    useEffect(() => {
        if (!collectionData) return;

        reset({
            name: collectionData.name,
        });

        setSelectedCards(collectionData.cards ?? []);
    }, [collectionData, reset]);

    return (
        <Modal ref={modalRef}>
            <h2>{isEditing ? "Editar Coleção" : "Criar Coleção"}</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <label>Nome</label>
                    <input
                        type="text"
                        {...register("name", { required: "Nome obrigatório" })}
                    />
                </div>
                {errors.name && <span>{errors.name.message}</span>}

                <CardSelect>
                    <label>Selecionar Cartas para a Coleção</label>
                    <div className="form-row">
                        <select value={selectedCardGame} onChange={(e) => setSelectedCardGame(e.target.value as CardGame)}>
                            <option>
                                Yu-Gi-Oh!
                            </option>
                        </select>
                        <SearchBar
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onSubmit={() => setSearchValue(searchValue)}
                        />
                    </div>
                    <CardsView>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <div> {error}</div>
                        ) : (
                            nameFilteredCards.length === 0 ? (
                                <ComponentAlert>
                                    <p>
                                        Nenhuma carta encontrada.
                                    </p>
                                </ComponentAlert>
                            ) : (
                                <CardsViewContainer>
                                    <Carousel
                                        scrollRef={carouselRef}
                                        onScroll={handleScroll}
                                    >
                                        {nameFilteredCards.slice(0, visibleCount).map((card) => (
                                            <ColumnContainer key={card.id}>
                                                <CardView
                                                    image={card.image_url ? card.image_url : ""}
                                                    name={card.name}
                                                    card={card}
                                                    cardType={selectedCardGame}
                                                />
                                                <a onClick={() => toggleSelectCard({
                                                    cardName: card.name,
                                                    cardImage: card.image_url || "",
                                                    cardType: "Yu-Gi-Oh!",
                                                    data: card,
                                                })}>
                                                    Selecionar
                                                </a>
                                            </ColumnContainer>
                                        ))}

                                    </Carousel>
                                </CardsViewContainer>
                            )
                        )}
                    </CardsView>
                </CardSelect>
                <CardSelect>
                    <SelectedCards>
                        <strong>Selecionadas ({selectedCards.length}):</strong>
                        {selectedCards.length === 0 ? (
                            <div>Nenhuma</div>
                        ) : (
                            <SelectedCardsContainer>
                                {selectedCards.map((c) => (
                                    <div key={c.data.id} className="form-row">
                                        {c.cardName}
                                        <ExcludeButton
                                            type="button"
                                            onClick={() => removeSelectedCard(c.data.id)}
                                        >
                                            <X />
                                        </ExcludeButton>
                                    </div>
                                ))}
                            </SelectedCardsContainer>
                        )}
                    </SelectedCards>
                </CardSelect>

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
    );
};

export default CreateCardCollection;