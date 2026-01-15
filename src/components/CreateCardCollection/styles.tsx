import styled from "styled-components";

export const CardSelect = styled.div`
    display: flex;
    width: 35rem;
    border-radius: 0.3rem;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin-top: 1rem;
    gap: 0.5rem;
    background: var(--primary-gray);
    overflow: hidden;

    select {
        background: var(--secondary-gray);
        border: none;
        width: 100%;
        height: 5rem;
        border-radius: 0.3rem;
        padding: 0.5rem;
        font-size: 1.2rem;
        outline: none;
    }

    span {
        color: white;
        font-weight: 700;
    }
`
export const CardsView = styled.div`
    width: 100%;
    overflow: hidden;

    a {
        background: var(--secondary-gray);
    }
`

export const CardsViewContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
`

export const ColumnContainer = styled.div`
    min-width: 1rem;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
`

export const SelectedCards = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const SelectedCardsContainer = styled.div`
    width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`
export const ExcludeButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;

    &:hover {
        background: var(--secondary-gray);
        transform: scale(1.1);
    }
`;