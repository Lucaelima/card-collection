import styled from "styled-components";
import Image from "next/image";

interface DropdownListProps {
    $visible: boolean;
}

export const ProfileNavBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    position: relative;
`

export const UserName = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    margin-left: 3rem;
`

export const ProfilePhoto = styled.img`
    background: var(--secondary-gray);
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    object-fit: cover;
    cursor: pointer;
`

export const DropdownList = styled.ul<DropdownListProps>`
    background: var(--primary-gray);
    display: ${({ $visible }) => $visible ? 'flex' : 'none'};
    flex-direction: column;
    border-radius: 0.3rem;
    position: absolute;
    right: 0;
    top: 6rem;
    list-style: none;
    box-shadow: 0 0.2rem 0.7rem 0.2rem rgba(0, 0, 0, 0.253);
    overflow: hidden;
    z-index: 1;
    li {
        background: var(--secondary-gray);
        display: flex;
        justify-content: center;
        width: 20rem;
        padding: 0.7rem;

        &:hover {
            color: white;
            opacity: 0.5;
            cursor: pointer;
        }
    }

`