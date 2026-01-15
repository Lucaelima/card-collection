import styled from "styled-components";

const CardsContainer = styled.div`
    display: grid;
    max-width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    justify-items: center;
    margin: 2rem;
    gap: 2rem;
`

export default CardsContainer;