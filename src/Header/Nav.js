import React from 'react';
import {css} from '@emotion/core';
import {Link} from '@reach/router';
const Nav = ({active}) => {
    const navItem = css`
        border-bottom: 1px solid var(--action-color);
        opacity: 0;
        transition: opacity 0.15s ease-in-out;
        &:after {
            content: '';
            display: block;
            width: 0;
            height: 1px;
            background: var(--action-color);
            transition: width 0.3s;
        }
        @media (min-width: 60.25em) {
            opacity: 1;
            display: inline-block;
            border: none;
            &:hover::after,
            &.active::after {
                width: 100%;
            }
        }
    `;
    const navLink = css`
        text-decoration: none;
        display: block;
        color: var(--dark-gray);
        padding: 0.7em 0 0;
    `;

    const activeNav = css`
        transform: scale(1, 1);
        & li {
            opacity: 1;
        }
    `;
    return (
        <nav
            css={css`
                font-size: 1.5em;
                position: absolute;
                transform-origin: 50% 0;
                transform: scale(1, 0);
                top:3em;
                transition: transform 0.15s ease-in-out 0.15s;
                width: 100%;
                  @media (min-width:43.75em){
                    font-size:1.7em
                }

                 @media (min-width:60.25em){
                    position: relative;
                                        font-size:1.4em;

top: initial;
width: auto;
transform: none;
                }
                ${active ? activeNav : ''}


            }
            `}>
            <ul
                css={css`
                    @media (min-width: 60.25em) {
                        display: flex;
                    }
                `}>
                <li
                    css={css`
                        order: 3;
                        ${navItem}
                    `}>
                    <Link
                        tabIndex={3}
                        onFocus={e => e.currentTarget.parentNode.classList.add('active')}
                        onBlur={e => e.currentTarget.parentNode.classList.remove('active')}
                        to="/login"
                        css={navLink}>
                        log in
                    </Link>
                </li>{' '}
                <li
                    css={css`
                        order: 1;
                        @media (min-width: 60.25em) {
                            margin-right: 1.3em;
                        }
                        ${navItem}
                    `}>
                    <Link
                        tabIndex={2}
                        onFocus={e => e.currentTarget.parentNode.classList.add('active')}
                        onBlur={e => e.currentTarget.parentNode.classList.remove('active')}
                        to="/about"
                        css={navLink}>
                        about
                    </Link>
                </li>
                <li
                    css={css`
                        @media (min-width: 60.25em) {
                            margin-right: 1.3em;
                        }
                        ${navItem}
                    `}>
                    <form>
                        <input
                            tabIndex={1}
                            onFocus={e => e.currentTarget.parentNode.parentNode.classList.add('active')}
                            onBlur={e => e.currentTarget.parentNode.parentNode.classList.remove('active')}
                            css={css`
                                font-family: var(--id-font);
                                font-size: 1em;
                                border: none;
                                width: 100%;
                                color: var(--dark-gray);
                                padding: 0.7em 0 0;
                                @media (min-width: 60.25em) {
                                    width: 8em;
                                }
                            `}
                            placeholder="search..."
                            type="text"
                        />
                    </form>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
