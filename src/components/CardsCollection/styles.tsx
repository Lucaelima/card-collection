import styled from "styled-components";

export const CardsCollectionContainer = styled.div`
    background: var(--primary-gray);
    width: 60vw;
    border-radius: 0.3rem;
    margin: 1rem 0;
`

export const CollectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    .header-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    button {
        display: flex;
        align-items: center;
        padding: 0.3rem;
        gap: 0.3rem;
        background: none;
        border: none;
        border-radius: 0.3rem;
        color: var(--text-color);
        font-size: 1.2rem;

        &:hover {
            background: var(--secondary-gray);
            color: white;
            transform: scale(1.1);
            cursor: pointer;
        }
    }
`

export const CollectionCardsList = styled.div`
    position: relative;
    background: var(--secondary-gray);
    display: grid;
    grid-template-columns: repeat(auto-fit, 8rem);
    gap: 1rem;
    max-width: 60vw;
    overflow: hidden; 
    padding: 1rem;
    margin: 0 1rem 1rem;
    border-radius: 0.3rem;
`

export const ShowMore = styled.button`
    width: 10rem;
    height: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-family: "Nunito", sans-serif;
    font-size: 1.4rem;
    cursor: pointer;
`

export const ShowLess = styled.button`
    width: 10rem;
    height: 3rem;
    position: absolute;
    right: 0;
    bottom: 0;
    border: none;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem; 
    background: rgba(0, 0, 0, 0.5);
    font-family: "Nunito", sans-serif;
    font-size: 1.4rem;
    color: white;
    cursor: pointer;
`