import styled from "styled-components";

export const ButtonContainer = styled.button`
    background: transparent;
    color: var(--secondary-gray);
    width: 4rem;
    height: 4rem;
    border: none;
    font-size: 4rem;
    cursor: pointer;
    &:hover {
        color: var(--primary-orange);
    }
`