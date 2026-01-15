import { Search, X } from "lucide-react";
import { ClearButton, IconWrapper, SearchForm, SearchInput } from "./styles";
import { ChangeEvent, FormEvent } from "react";


interface SearchBarProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (value: string) => void;
    placeholder?: string;
    ariaLabel?: string;
}


const SearchBar = ({
    value,
    onChange,
    onSubmit = () => { },
    placeholder = "Pesquisar...",
    ariaLabel = "Campo de busca",
}: SearchBarProps) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(value);
    };

    const handleClear = () => {
        const event = {
            target: { value: "" },
        } as ChangeEvent<HTMLInputElement>;
        onChange(event);
    };

    return (
        <SearchForm role="search" onSubmit={handleSubmit} aria-label={ariaLabel}>
            <IconWrapper aria-hidden>
                <Search size={18} />
            </IconWrapper>

            <SearchInput
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-label={ariaLabel}
            />

            {value && (
                <ClearButton
                    type="button"
                    onClick={handleClear}
                    aria-label="Limpar busca"
                    title="Limpar"
                >
                    <X size={16} />
                </ClearButton>
            )}
        </SearchForm>
    );
}

export default SearchBar;