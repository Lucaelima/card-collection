import styled from "styled-components";

const Form = styled.form`
    .form-row {
        display: flex;
        width: 100%;
        justify-content: end;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    span {
        display: flex;
        color: #f82549;
        font-weight: 700;
        justify-content: center;
    }
    input {
        background: var(--primary-gray);
        width: 20rem;
        border:  0.3rem solid var(--secondary-gray);
        border-radius: 0.5rem;
        padding: 0.5rem;
        font-size: 1rem;
        outline: none;
        &:focus {
            background: var(--primary-orange);
            outline: 0.3rem solid var(--secondary-orange);
            outline-offset: 0.1rem;
        }
    }
`

export default Form;