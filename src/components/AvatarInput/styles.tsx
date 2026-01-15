import styled from "styled-components";

export const AvatarInputContainer = styled.div`
    label {
        position: relative;
        width: 8rem;
        height: 8rem;
        border-radius: 0.3rem;
        overflow: hidden;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: var(--primary-gray);
        border: 0.3rem solid var(--secondary-gray);
    }

    button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        z-index: 1;
        outline: none;
    }

    span {
        color: var(--text-color);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 2;
    }
    
    &:hover {
        span {
            opacity: 1;
        }
        img {          
            opacity: 0.4;
        }
    }
`;

export const AvatarImage = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 0;
`