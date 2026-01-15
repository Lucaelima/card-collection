"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { FilterContainer, Section } from "./styles";

export type FilterSection = {
    title: string;
    options: string[];
};

type FilterSidebarProps = {
    title?: string;
    sections: FilterSection[];
    onFilterChange?: (selected: string[]) => void;
};

const FilterSidebar = ({
    title = "Filtros",
    sections,
    onFilterChange,
}: FilterSidebarProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const toggleSection = (key: string) => {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleSelection = (option: string) => {
        const newSelected = selected.includes(option)
            ? selected.filter((o) => o !== option)
            : [...selected, option];

        setSelected(newSelected);
        onFilterChange?.(newSelected);
    };

    return (
        <FilterContainer>
            <h2>
                <Filter /> {title}
            </h2>

            {sections.map((section) => (
                <Section key={section.title}>
                    <button
                        onClick={() => toggleSection(section.title)}
                    >
                        <p>{section.title}</p>
                        {openSections[section.title] ? (
                            <ChevronUp />
                        ) : (
                            <ChevronDown />
                        )}
                    </button>

                    {openSections[section.title] && (
                        <div>
                            {section.options.map((option) => (
                                <label
                                    key={option}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(option)}
                                        onChange={() => toggleSelection(option)}
                                    />
                                    <span>
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </Section>
            ))}
        </FilterContainer>
    );
}

export default FilterSidebar;