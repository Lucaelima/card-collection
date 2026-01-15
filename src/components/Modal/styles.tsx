import styled from "styled-components";

export const DialogContainer = styled.dialog`
    background-color: var(--bg-color);
    min-width: 40rem;
    border: none;
    border-radius: 0.3rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 2rem 2rem 0 var(--primary-orange);
    overflow-x: visible;
    &::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
`

export const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 3rem;
    gap: 2rem;
    overflow-y: auto;
`