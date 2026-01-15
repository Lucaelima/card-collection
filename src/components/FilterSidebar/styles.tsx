import styled from "styled-components";

export const FilterContainer = styled.aside`
    padding: 1rem;
`

export const Section = styled.div`
    button {
        display: flex;
        background: none;
        color: var(--text-color);
        border: none;
        margin-top: 1rem;
        font-family: "Nunito", sans-serif;
        font-size: 1.2rem;
        font-weight: 700;
        text-align: left;
        text-size-adjust: 3rem;
        cursor: pointer;
        p {
            max-width: 10.5rem;
        }
    }
    div {
        display: flex;
        flex-direction: column;
        label {
            input {
                appearance: none;
                -webkit-appearance: none;
            }
            span {
                cursor: pointer;
            }
            input:checked + span {
                color: white;
                font-weight: 500;
            }
        }
    }
`

export const Options = styled.div`
   

`