import React from 'react';
import Subtitle from '../Subtitle/Subtitle';
import UserContext from '../Contexts/UserContext';
import {Query} from 'react-apollo';
import {READ_BOOKS} from '../Queries';
import {Link} from '@reach/router';
import {css} from '@emotion/core';

const User = () => (
    <div>
        <UserContext.Consumer>
            {({user: {name}}) => {
                return (
                    <div>
                        <Subtitle text="read books" />
                        {name ? (
                            <Query query={READ_BOOKS} variables={{username: name}} fetchPolicy="network-only">
                                {({data: {readBooks}, loading}) =>
                                    loading ? (
                                        <h2>loading</h2>
                                    ) : readBooks ? (
                                        readBooks.map(({title, author, chapterNr, pageNr}) => (
                                            <div key={title}>
                                                <h2
                                                    className="title"
                                                    css={css`
                                                        margin-bottom: 0;
                                                    `}>
                                                    {title}
                                                </h2>

                                                <h2
                                                    css={css`
                                                        margin-top: 0;
                                                        border-bottom: 1px solid var(--dark-gray);
                                                    `}>
                                                    by {author}
                                                </h2>
                                                <h2>
                                                    <Link
                                                        css={css`
                                                            border: 1px solid var(--action-color);
                                                            border-radius: 5px;
                                                            padding: 0.4em;
                                                            font-family: var(--id-font);
                                                            &:hover {
                                                                color: #fff;
                                                                background: var(--dark-gray);
                                                                border-color: transparent;
                                                            }
                                                        `}
                                                        to={`/${title}/${chapterNr}/${pageNr}`}>
                                                        continue reading
                                                    </Link>
                                                    <Link
                                                        css={css`
                                                            border: 1px solid var(--action-color);
                                                            border-radius: 5px;
                                                            padding: 0.4em;
                                                            font-family: var(--id-font);
                                                            margin-left: 10px;
                                                            &:hover {
                                                                color: #fff;
                                                                background: var(--dark-gray);
                                                                border-color: transparent;
                                                            }
                                                        `}
                                                        to={`/${title}`}>
                                                        details
                                                    </Link>
                                                </h2>
                                            </div>
                                        ))
                                    ) : (
                                        <p>no read books...</p>
                                    )
                                }
                            </Query>
                        ) : (
                            <p>
                                looks like you're not logged in, you can log in{' '}
                                <Link
                                    css={css`
                                        border-bottom: 1px solid var(--action-color);
                                    `}
                                    to="/login">
                                    here
                                </Link>{' '}
                                or sign up{' '}
                                <Link
                                    css={css`
                                        border-bottom: 1px solid var(--action-color);
                                    `}
                                    to="/signup">
                                    here
                                </Link>
                            </p>
                        )}
                    </div>
                );
            }}
        </UserContext.Consumer>
    </div>
);

export default User;
