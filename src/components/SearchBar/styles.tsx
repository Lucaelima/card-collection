import styled from "styled-components";

export const SearchForm = styled.div`
    display: flex;
    align-self: center;
    width: 100%;
    background: var(--secondary-gray);
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
    border-radius: 0.3rem;
    padding: 0.7rem 1rem;
`;


export const IconWrapper = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
`;


export const SearchInput = styled.input`
    flex: 1 1 auto;
    border: none;
    outline: none;
    width: 100%;
    font-family: "Nunito", sans-serif;
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 1.2;
    color: white;
    background: transparent;
    margin: 0.5rem 0 0.5rem 1rem;

    &::placeholder {
    color: var(--text-color);
    }
`;


export const ClearButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;


    &:hover {
    background: rgba(15, 23, 42, 0.04);
    }
`;