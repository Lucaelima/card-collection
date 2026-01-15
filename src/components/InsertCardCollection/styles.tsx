import styled from "styled-components";

export const CardViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CollectionSelectContainer = styled.div`
    display: flex;
    width: 100%;
    border-radius: 0.3rem;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin-top: 1rem;
    gap: 0.5rem;
    background: var(--primary-gray);
    overflow: hidden;

    span {
        color: white;
        font-weight: 700;
    }
`

export const CardCollections = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    align-items: center;
    margin-top: 1rem;

    span {
        cursor: pointer;
        background: var(--secondary-gray);
        padding: 0.5rem;
        border-radius: 0.3rem;

        &:hover {
            transform: scale(1.1);
        }
    }
`

export const CardsCollectionsSelected = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const SelectedCollectionsContainer = styled.div`
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