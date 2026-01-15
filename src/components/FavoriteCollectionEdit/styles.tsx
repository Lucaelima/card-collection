import styled from "styled-components";

type CollectionDataProps = {
    $selected: boolean;
}

export const CollectionSelectContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    span {
        color: var(--text-color);
    }
`

export const Collections = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const CollectionData = styled.div<CollectionDataProps>`
    width: 100%;
    display: flex;
    border-radius: 0.3rem;
    flex-direction: column;
    gap: 0.3rem;
    padding: 0.3rem;

    ${({ $selected }) => $selected ? `
        background: var(--secondary-gray);
        h2 {color: white;}
    ` : null};
`

export const CollectionHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`