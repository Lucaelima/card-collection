import Image from "next/image";
import styled from "styled-components";

export const ContainerDetailCard = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end
`

export const Details = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    gap: 2rem;
`

export const CardImage = styled(Image)`
    max-height: 35rem;
    height: auto;
    width: auto;
`

export const Informations = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    div {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.3rem;
        white-space: nowrap;
    }
    p {
        background: var(--secondary-gray);
        color: white;
        border-radius: 0.3rem;
        padding: 0.5rem;
    }
`