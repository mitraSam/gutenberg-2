import React from 'react';
import Subtitle from '../Subtitle/Subtitle';
import UserContext from '../Contexts/UserContext';
import {Query} from 'react-apollo';
import {READ_BOOKS} from '../Queries';
import {Link} from '@reach/router';
import {css} from '@emotion/core';
import ActionLink from '../ActionLink/Index';

const User = () => (
    <div>
        <UserContext.Consumer>
            {({user: {name}}) => {
                return (
                    <div
                        css={css`
                            @media (min-width: 75em) {
                                margin-left: 1.4em;
                            }
                        `}>
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
                                                        margin: 0;
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
                                                <ActionLink
                                                    to={`/${title}/${chapterNr}/${pageNr}`}
                                                    text="continue reading"
                                                />
                                                <ActionLink
                                                    css={css`
                                                        margin-left: 10px;
                                                    `}
                                                    to={`/${title}`}
                                                    text="details"
                                                />
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
