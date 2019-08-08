import React, {useState} from 'react';
import {css} from '@emotion/core';
import {Link} from '@reach/router';
import SearchForm from '../Search/SearchForm';

const NavItem = ({link, updateNavState}) => {
    const [linkState, updateLinkState] = useState(false);

    const activeItem = css`
        &::after {
            width: 100%;
        }
    `;
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
            margin-right: 1.3em;

            &:hover::after {
                width: 100%;
            }
            ${linkState ? activeItem : ''}

            &:first-of-type {
                margin-right: 0;
            }
        }
    `;
    const navLink = css`
        text-decoration: none;
        display: block;
        color: var(--dark-gray);
        padding: 0.7em 0 0;
    `;

    return (
        <li
            css={css`
                order: ${link.totalLinks - link.i};
                ${navItem};
            `}>
            {link.name === 'search' ? (
                <SearchForm update={updateLinkState} onSubmit={() => updateNavState(false)}></SearchForm>
            ) : (
                <Link
                    tabIndex={link.totalLinks - link.i}
                    onFocus={() => updateLinkState(true)}
                    onBlur={() => updateLinkState(false)}
                    to={`/${link.name}`}
                    css={navLink}>
                    {link.name}
                </Link>
            )}
        </li>
    );
};
export default NavItem;
