import React, {useState} from 'react';
import {css} from '@emotion/core';
import {Link} from '@reach/router';

import Nav from './Nav';

const Header = () => {
    const [navState, updateNavState] = useState(false);
    const activeNavBtn = css`
        border-color: transparent;
        color: #fff;
        background: var(--dark-gray);
    `;
    return (
        <header
            css={css`
                font-family: var(--id-font);
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                position: relative;
            `}>
            <h1>
                <Link
                    tabIndex={0}
                    to="/"
                    css={css`
                        color: var(--dark-gray);
                        text-decoration: none;
                        font-weight: initial;
                        &:focus {
                            color: var(--action-color);
                        }
                    `}>
                    {' '}
                    gutenberg's den
                </Link>
            </h1>
            <button
                css={css`
                    border: 1px solid var(--action-color);
                    border-radius: 5px;
                    font-family: var(--id-font);
                    font-size: 1.6em;
                    padding: 0.1em 0.35em;
                    margin-top: 0.35em;
                    @media (min-width: 60.25em) {
                        display: none;
                    }

                    ${navState ? activeNavBtn : ''}
                    &:active {
                        border-color: transparent;
                        color: #fff;
                        background: var(--dark-gray);
                    }
                `}
                onClick={() => updateNavState(!navState)}>
                m
            </button>
            <Nav active={navState} />
        </header>
    );
};
export default Header;
