"use client"

import { useEffect, useRef, useState } from "react";
import { ICardsCollection } from "@/types/ICardsCollection";
import { CardsCollectionContainer, CollectionCardsList, CollectionHeader, ShowLess, ShowMore } from "./styles";
import CardView from "../CardView";
import { BookX, Pencil } from "lucide-react";
import CreateCardCollection from "../CreateCardCollection";
import { ModalRef } from "@/types/ModalRef";
import DeleteAlert from "../DeleteAlert";

const GAP_REM = 1;

const CardsCollection = (cardCollection: ICardsCollection) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [visibleCards, setVisibleCards] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const updateCollectionRef = useRef<ModalRef>(null as unknown as ModalRef);
    const deleteCollectionRef = useRef<ModalRef>(null as unknown as ModalRef);

    useEffect(() => {
        const calculate = () => {
            if (!listRef.current) return;

            const rem = parseFloat(
                getComputedStyle(document.documentElement).fontSize
            );

            const CARD_WIDTH = 8.8 * rem;
            const GAP = GAP_REM * rem;

            const containerWidth = listRef.current.offsetWidth;

            const cardsPerRow = Math.floor(
                (containerWidth + GAP) / (CARD_WIDTH + GAP)
            );

            setVisibleCards(cardsPerRow);
        };

        calculate();
        window.addEventListener("resize", calculate);
        return () => window.removeEventListener("resize", calculate);
    }, []);

    return (
        <CardsCollectionContainer>
            <CollectionHeader>
                <h2>{cardCollection.name}</h2>
                <div className="header-container">
                    <span>{cardCollection.cards.length} cartas</span>
                    <button onClick={() => updateCollectionRef.current?.open()}>
                        <Pencil />
                        Editar
                    </button>
                    <button onClick={() => deleteCollectionRef.current?.open()}>
                        <BookX />
                        Excluir
                    </button>

                </div>
            </CollectionHeader>

            <CollectionCardsList ref={listRef}>
                {cardCollection.cards
                    .slice(0, showMore ? cardCollection.cards.length : visibleCards)
                    .map((card, index) => (
                        <CardView
                            key={index}
                            image={card.cardImage ?? ""}
                            name={card.cardName}
                            card={card.data}
                            cardType={card.cardType}
                        />
                    ))}
                {cardCollection.cards.length > visibleCards && !showMore && (
                    <ShowMore onClick={() => setShowMore(true)}>
                        Mostrar mais...
                    </ShowMore>
                )}
                {showMore && (
                    <ShowLess onClick={() => setShowMore(false)}>
                        Mostrar menos
                    </ShowLess>
                )}
            </CollectionCardsList>
            <CreateCardCollection modalRef={updateCollectionRef} collectionData={cardCollection} />
            <DeleteAlert modalRef={deleteCollectionRef} name={cardCollection.name} collectionId={cardCollection.id} />
        </CardsCollectionContainer>
    );
};

export default CardsCollection;