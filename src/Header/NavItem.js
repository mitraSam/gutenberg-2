import React from 'react';
import {css} from '@emotion/core';
import {Link} from '@reach/router';
import NavForm from './NavForm';

const NavItem = ({link}) => {
    function setActive(e) {
        e.currentTarget.parentNode.classList.add('active');
    }
    function unsetActive(e) {
        console.log(e.currentTarget.parentNode);
        e.currentTarget.parentNode.classList.remove('active');
    }
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
                order: ${3 - link.i};
                ${navItem};
                @media (min-width: 60.25em) {
                    margin-right: 1.3em;
                }
            `}>
            {link.name === 'search' ? (
                <NavForm></NavForm>
            ) : (
                <Link tabIndex={3 - link.i} onFocus={setActive} onBlur={unsetActive} to={`/${link.name}`} css={navLink}>
                    {link.name}
                </Link>
            )}
        </li>
    );
};
export default NavItem;
