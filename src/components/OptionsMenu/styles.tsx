import Link from "next/link";
import styled from "styled-components";

export const OptionsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Option = styled(Link)`
    background: var(--primary-gray);
    width: 40rem;
    height: 8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 0.5rem solid var(--primary-orange);
    border-radius: 0.5rem;
    h2 {
        font-size: 4rem;
        font-weight: 700;
    }
`