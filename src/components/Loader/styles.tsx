import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0); }
  100% { transform: rotate(0deg); }
`;

const rotateCard = keyframes`
  0% { transform: rotate(var(--initial-rotate)); }
  100% { transform: rotate(calc(var(--initial-rotate) + 360deg)); }
`;

export const LoaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    font-size: 2.5rem;
`

export const CardLoader = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  animation: ${spin} 3 linear infinite;
`;

export const Card = styled.div<{ $i: number }>`
  --initial-rotate: ${({ $i }) => $i * 45}deg;

  position: absolute;
  width: 2rem;
  height: 3rem;
  border-radius: 4px;
  background: var(--primary-orange);
  top: 65%;
  left: 50%;
  transform-origin: 0 -20px;
  transform: rotate(var(--initial-rotate));
  animation: ${rotateCard} ${({ $i }) => 2 + $i * 0.1}s linear infinite;
`;