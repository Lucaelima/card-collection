'use client'

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --bg-color: #c8d5d8;
        --text-color: #34343a;
        --primary-gray: #888888;
        --secondary-gray: #717a7c;
        --primary-orange: #be7827;
        --secondary-orange: #aa6414;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        width: 100%;
        height: 100%;
        font-family: inherit; 
        font-size: 1.2rem;
        line-height: 1.6;
        color: var(--text-color);
        background-color: var(--bg-color);
    }

    h1, h2, h3, h4, h5, h6 {
        margin-bottom: 0.5rem;  
    }

    h3 {
        background: var(--primary-gray);
        border-radius: 0.3rem;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 1.5rem;
        font-weight: 500;
        padding: 0.3rem;
        grid-area: name;
    }

    a {
        display: flex;
        border-radius: 0.3rem;
        align-items: center;
        padding: 0.3rem;
        gap: 0.3rem;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: 500;
        text-decoration: none;
        color: inherit;
        &:hover {
            background-color: var(--primary-gray);
            color: white;          
        }
    }
`