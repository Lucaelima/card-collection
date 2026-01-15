import Image from "next/image";
import styled from "styled-components";

export const CardContainer = styled.div`
    min-width: 20rem;
    max-width: 25rem;
    min-height: 30rem;
    max-height: 40rem;
    display: grid;
    border-radius: 0.3rem;
    padding: 0.5rem;
    gap: 0.5rem;
    position: relative;
    grid-template-rows: auto auto auto;
    grid-template-columns: 1fr 20rem 1fr;
    grid-template-areas: 
        "name name name"
        ". image ."
        "button button button";
    place-items: center; 
    border-radius: 0.3rem;
    overflow: hidden;
    z-index: 1;

    button {
        grid-area: button
    }
    &:hover {
        background: var(--primary-gray);
        color: white;
    }
`

export const CardImage = styled(Image)`
    width: min-content;
    height: min-content;
    grid-area: image;
`