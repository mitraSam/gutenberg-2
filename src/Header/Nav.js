import React from 'react';
import {css} from '@emotion/core';
import {Link} from '@reach/router';

import NavItem from './NavItem';

const Nav = ({active}) => {
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
                {links.map((link, i) => (
                    <NavItem key={link} link={{name: link, i}} />
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
