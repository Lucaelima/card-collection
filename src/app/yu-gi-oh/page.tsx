"use client"

import Card from "@/components/Card";
import CardsContainer from "@/components/CardsContainer";
import CardsContent from "@/components/CardsContent";
import { CardsNav } from "@/components/CardsNav";
import ExplorerPanel from "@/components/ExplorerPanel.tsx";
import { FilterSection } from "@/components/FilterSidebar";
import Loader from "@/components/Loader";
import ScreenAlert from "@/components/ScreenAlert";
import { useCardStore } from "@/store/cardStore";
import { Grid2x2Plus } from "lucide-react";
import { useEffect, useState } from "react";

const sections: FilterSection[] = [
    {
        title: "Tipos de Cartas",
        options: [
            "Effect Monster",
            "Normal Monster",
            "Pendulum Effect Monster",
            "Ritual Monster",
            "Fusion Monster",
            "Link Monster",
            "Synchro Monster",
            "XYZ Monster",
            "Skill Card",
            "Token",
            "Spell Card",
            "Trap Card",
        ],
    },
    {
        title: "Tipos de Monstros",
        options: [
            "Aqua",
            "Beast",
            "Beast-Warrior",
            "Cyberse",
            "Dinosaur",
            "Dragon",
            "Fairy",
            "Fiend",
            "Machine",
            "Warrior",
            "Zombie",
        ]
    },
    {
        title: "Tipos de Magias e Armadilhas",
        options: [
            "Normal",
            "Field",
            "Equip",
            "Continuous",
            "Quick-Play",
            "Ritual",
            "Counter"
        ]
    }
];

const typeOptions = [
    "Effect Monster",
    "Normal Monster",
    "Pendulum Effect Monster",
    "Ritual Monster",
    "Fusion Monster",
    "Link Monster",
    "Synchro Monster",
    "XYZ Monster",
    "Skill Card",
    "Token",
    "Spell Card",
    "Trap Card"
];

const raceOptions = [
    "Aqua",
    "Beast",
    "Beast-Warrior",
    "Cyberse",
    "Dinosaur",
    "Dragon",
    "Fairy",
    "Fiend",
    "Machine",
    "Warrior",
    "Zombie",
    "Normal",
    "Field",
    "Equip",
    "Continuous",
    "Quick-Play",
    "Ritual",
    "Counter"
];

export default function Yugioh() {
    const { cards, loading, error, fetchYuGiOhCards } = useCardStore();
    const [visibleCount, setVisibleCount] = useState(20);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedRaces, setSelectedRaces] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState("");

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 20);
    };

    const handleFiltersChange = (selected: string[]) => {
        const types = selected.filter(s => typeOptions.includes(s));
        const races = selected.filter(s => raceOptions.includes(s));

        setSelectedTypes(types);
        setSelectedRaces(races);
    };

    const filteredByType = selectedTypes.length === 0
        ? cards
        : cards.filter(card => selectedTypes.includes(card.type));

    const fullyFilteredCards = filteredByType.filter(card => {
        if (selectedRaces.length === 0) return true;
        return selectedRaces.includes(card.race);
    });

    const nameFilteredCards = fullyFilteredCards.filter(card =>
        card.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const visibleCards = nameFilteredCards.slice(0, visibleCount);

    useEffect(() => {
        fetchYuGiOhCards();
    }, [fetchYuGiOhCards]);

    useEffect(() => {
        setVisibleCount(20);
    }, [selectedTypes, selectedRaces, searchValue]);

    return (
        <CardsContent>
            <ExplorerPanel
                sections={sections}
                handleFiltersChange={handleFiltersChange}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSubmit={() => setSearchValue(searchValue)}
            >
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div> {error}</div>
                ) : (
                    nameFilteredCards.length === 0 ? (
                        <ScreenAlert>
                            <div>
                                <span>😢</span>
                                <p>
                                    Nenhuma carta encontrada.
                                </p>
                            </div>
                        </ScreenAlert>
                    ) : (
                        <>
                            <CardsContainer>
                                {visibleCards.map((card) => (
                                    <Card name={card.name} image={card.image_url} card={card} key={card.id} cardType="Yu-Gi-Oh!" />
                                ))}
                            </CardsContainer>
                            <CardsNav>
                                (<b>{Math.min(visibleCount, nameFilteredCards.length)}</b>) cartas vsíveis do total de (<b>{nameFilteredCards.length}</b>) cartas encontradas
                                {nameFilteredCards.length > visibleCount && (
                                    <a onClick={handleLoadMore}>
                                        <Grid2x2Plus />
                                        Carregar mais cartas
                                    </a>
                                )}
                            </CardsNav>
                        </>
                    )

                )}
            </ExplorerPanel>
        </CardsContent>
    )
}