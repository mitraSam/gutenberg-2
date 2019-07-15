import React from 'react';
import {css} from '@emotion/core';

import NavItem from './NavItem';

const Nav = ({navState, updateNavState}) => {
    const links = ['log in', 'about', 'search'];
    const activeNav = css`
        transform: scale(1, 1);
        & li {
            opacity: 1;
        }
    `;
    return (
        <nav
            css={css`
background: var(--off-white);
                font-size: 1.5em;
                position: absolute;
                transform-origin: 50% 0;
                transform: scale(1, 0);
                top:3em;
                transition: transform 0.15s ease-in-out 0.15s;
                width: 97%;
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
                ${navState ? activeNav : ''}


            }
            `}>
            <ul
                css={css`
                    @media (min-width: 60.25em) {
                        display: flex;
                    }
                `}>
                {links.map((link, i) => (
                    <NavItem
                        updateNavState={updateNavState}
                        key={link}
                        link={{name: link, i, totalLinks: links.length}}
                    />
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
