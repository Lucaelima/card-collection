import styled from "styled-components";

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const ArrowButton = styled.button`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  &:first-child {
    left: 10px;
  }

  &:last-child {
    right: 10px;
  }
`;

export const CarouselContent = styled.div`
    display: flex;
    padding: 0.3rem;
    gap: 0.5rem;
    max-width: 35rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    -webkit-overflow-scrolling: touch;
`