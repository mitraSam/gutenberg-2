import React, {useState} from 'react';
import {css} from '@emotion/core';
import {Link} from '@reach/router';
import UserContext from '../Contexts/UserContext';
import Nav from './Nav';

const Header = props => {
    const [navState, updateNavState] = useState(false);
    const activeNavBtn = css`
        border-color: transparent;
        color: #fff;
        background: var(--dark-gray);
    `;
    return (
        <UserContext.Consumer>
            {({user}) => (
                <div>
                    <header
                        className="wrapper"
                        css={css`
                            font-family: var(--id-font);
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;
                            justify-content: space-between;
                            position: relative;
                            margin-bottom: 2em;
                            @media (min-width: 75em) {
                                margin-bottom: 3em;
                            }
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
                        <Nav navState={navState} updateNavState={updateNavState} />
                    </header>
                    {props.children}
                </div>
            )}
        </UserContext.Consumer>
    );
};
export default Header;
