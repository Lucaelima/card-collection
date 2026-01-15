import styled from "styled-components";

export const Container = styled.div`
    background-color: var(--primary-gray);
    width: 100%;
    max-height: 8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    position: absolute;
    top: 0;
    left: 0;

    h1 {
        cursor: pointer;
    }
`

export const UserContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    gap: 1rem;
`