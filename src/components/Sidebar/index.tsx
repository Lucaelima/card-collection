import styled from "styled-components";

interface SidebarProps {
    open: boolean;
}

export const Sidebar = styled.aside<SidebarProps>`
    background: var(--secondary-orange);
    min-width: 15rem;

    ${({ open }) =>
        open
            ? `
        display: block;
        transform: translateX(0);
      `
            : `
        display: none;
        transform: translateX(-100%);
      `}
`

export default Sidebar;