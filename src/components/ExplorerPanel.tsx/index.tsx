"use client";

import { ExplorerPanelContainer, MarginContainer, PageContent, SearchContainer, SidebarButton } from "./styles";
import FilterSidebar, { FilterSection } from "../FilterSidebar";
import Sidebar from "../Sidebar";
import SearchBar from "../SearchBar";
import { ChangeEvent, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

type ExplorePanelProps = {
    children: React.ReactNode;
    sections: FilterSection[];
    handleFiltersChange: (selected: string[]) => void;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (value: string) => void;
}

const ExplorerPanel = ({ children, sections, handleFiltersChange, value, onChange, onSubmit }: ExplorePanelProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <ExplorerPanelContainer>
            <Sidebar open={sidebarOpen} >
                <FilterSidebar sections={sections} onFilterChange={handleFiltersChange} />
            </Sidebar>
            <PageContent>
                <SearchContainer>
                    <SidebarButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? (
                            <PanelLeftClose size={40} />
                        ) : (
                            <PanelLeftOpen size={40} />
                        )}
                    </SidebarButton>
                    <MarginContainer>
                        <SearchBar value={value} onChange={onChange} onSubmit={onSubmit} />
                    </MarginContainer>
                </SearchContainer>
                {children}
            </PageContent>
        </ExplorerPanelContainer>
    )
}

export default ExplorerPanel;