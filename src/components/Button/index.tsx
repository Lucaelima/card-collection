import styled from "styled-components";

interface ButtonProps {
    $variant?: "gray" | "orange";
}
export const Button = styled.button<ButtonProps>`
    min-width: 7rem;
    border-radius: 0.5rem;
    border: 0.5rem solid;
    display: flex;
    justify-content: center;
    padding: 1rem;
    font-family: "Nunito", sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    position: relative;
    z-index: 2;
    text-shadow: 
    -1px -1px 0 #f3f3f3,  
     1px -1px 0 #f3f3f3,
    -1px  1px 0 #f3f3f3,
     1px  1px 0 #f3f3f3;
    ${({ $variant }) =>
        $variant === "gray" ? `
            background: var(--primary-gray);
            boder-color: var(--secondary-gray);
            color: var(--secondary-gray);        

        ` : $variant === "orange" ? `
            background: var(--primary-orange);
            boder-color: var(--secondary-orange);
            color: var(--secondary-orange);
        ` : null
    }
`