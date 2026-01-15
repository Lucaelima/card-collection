"use client"

import CardsCollection from "@/components/CardsCollection";
import CreateCardCollection from "@/components/CreateCardCollection";
import Loader from "@/components/Loader";
import MainContent from "@/components/MainContent";
import ScreenAlert from "@/components/ScreenAlert";
import { useAuthStore } from "@/store/authStore";
import { useCollectionStore } from "@/store/collectionStore";
import { ICardsCollection } from "@/types/ICardsCollection";
import { ModalRef } from "@/types/ModalRef";
import { BookPlus } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Collection() {
    const userId = useAuthStore((s) => s.user?.id);
    const { collections, loading, error, fetchCollections } = useCollectionStore();
    const createCollectionRef = useRef<ModalRef>(null as unknown as ModalRef);

    useEffect(() => {
        if (userId) {
            fetchCollections();
        }
    }, [userId, fetchCollections]);

    return (
        <MainContent>
            <div
                style={{
                    display: 'flex',
                    width: '80vw',
                    justifyContent: 'space-between',
                    gap: '1rem'
                }}
            >
                <h2>Coleções</h2>
                <a onClick={() => createCollectionRef.current?.open()}>
                    <BookPlus />
                    Criar nova coleção
                </a>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <div> {error}</div>
            ) : (
                <>
                    {collections.length > 0 ? collections.map((collection: ICardsCollection) => (
                        <CardsCollection
                            key={collection.id}
                            {...collection}
                        />
                    )) : (
                        <ScreenAlert>
                            <p>
                                Não há nehuma coleção.
                            </p>
                            <a onClick={() => createCollectionRef.current?.open()}>
                                <BookPlus />
                                Criar nova coleção
                            </a>
                        </ScreenAlert>
                    )}
                </>
            )}
            <CreateCardCollection modalRef={createCollectionRef} />
        </MainContent>
    )
}