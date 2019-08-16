import React from 'react';
import {css} from '@emotion/core';
import UserContext from '../Contexts/UserContext';
import NavItem from './NavItem';

const Nav = ({navState, updateNavState}) => {
    const defaultLinks = [{name: 'login'}, {name: 'about'}, {name: 'search'}];
    const activeNav = css`
        transform: scale(1, 1);
        & li {
            opacity: 1;
        }
    `;
    return (
        <UserContext.Consumer>
            {({user: {name}}) => {
                const links = name
                    ? [{name: 'logout', to: ''}, {name, to: 'user'}, {name: 'about'}, {name: 'search'}]
                    : defaultLinks;
                return (
                    <nav
                        css={css`
                background: var(--off-white);
                font-size: 1.5em;
                z-index: 100;
                position: absolute;
                transform-origin: 50% 0;
                transform: scale(1, 0);
                top:3em;
                transition: transform 0.15s ease-in-out 0.1s;
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
                                    key={link.name}
                                    link={{name: link.name, to: link.to, i, totalLinks: links.length}}
                                />
                            ))}
                        </ul>
                    </nav>
                );
            }}
        </UserContext.Consumer>
    );
};

export default Nav;
