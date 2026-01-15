
import styled from "styled-components";

export const ProfileInformationContainer = styled.div`
    width: 50rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 2rem;
`

export const InfoRow = styled.div`
    height: 100%;
    display: flex;
    gap: 1rem;
`

export const ProfileImage = styled.img`
    background: var(--primary-gray);
    border-radius: 0.3rem;
    width: 15rem;
    height: 15rem;
    object-fit: cover;
`

export const ProfieleDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;

    a {
        width: fit-content;
    }
`