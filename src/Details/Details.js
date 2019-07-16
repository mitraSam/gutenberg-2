import React from 'react';
import {Query} from 'react-apollo';
import {css} from '@emotion/core';
import {Link} from '@reach/router';
import {GET_BOOK_DETAILS} from '../Queries';

const Details = ({title}) => {
    const subtitle = css`
        font-family: var(--id-font);
    `;

    return (
        <div
            css={css`
                @media (min-width: 75em) {
                    margin-left: 1.4em;
                }
            `}>
            <h2
                css={css`
                    ${subtitle};
                `}>
                book details
            </h2>
            <Query query={GET_BOOK_DETAILS} variables={{title}} fetchPolicy="network-only">
                {({data, loading}) => {
                    const {bookDetails} = data;
                    console.log(bookDetails);
                    if (bookDetails) var {title, author, credits, license, url, wikiData, chapterTitles} = bookDetails;
                    return loading ? (
                        <h1>ladoing</h1>
                    ) : bookDetails ? (
                        <div>
                            <h1
                                css={css`
                                    margin-bottom: 0.3em;
                                    --h1-font-size-max: 3.75;
                                `}>
                                {title}
                            </h1>
                            <h2
                                css={css`
                                    margin-top: 0;
                                    --h2-font-size-max: 2;
                                `}>
                                by {author}
                            </h2>
                            <Link
                                to={`/${title}/read`}
                                className="subtitle"
                                css={css`
                                    font-family: var(--id-font);
                                    border: 1px solid var(--action-color);
                                    border-radius: 5px;
                                    display: inline-block;
                                    padding: 0.1em 0.35em;
                                    margin: 0.5em 0;
                                    &:hover {
                                        background: var(--dark-gray);
                                        border-color: transparent;
                                        color: #fff;
                                    }
                                `}>
                                read book
                            </Link>
                            <h2
                                css={css`
                                    ${subtitle};
                                `}>
                                from wikipedia
                            </h2>
                            <p>{wikiData}</p>
                            <h2
                                css={css`
                                    ${subtitle};
                                `}>
                                credits
                            </h2>
                            {credits.map(credit => (
                                <p key={credit}>{credit}</p>
                            ))}
                            <h2
                                css={css`
                                    ${subtitle}
                                `}>
                                license
                            </h2>
                            <p>{license}</p>
                            <p>
                                You can also read the original{' '}
                                <Link
                                    to={url}
                                    css={css`
                                        border-bottom: 1px solid var(--action-color);
                                    `}>
                                    here
                                </Link>
                            </p>
                            <h2
                                css={css`
                                    ${subtitle}
                                `}>
                                chapters
                            </h2>
                            {chapterTitles.map(chTitle => (
                                <p key={chTitle}>
                                    <Link
                                        css={css`
                                            border-bottom: 1px solid var(--action-color);
                                        `}
                                        to={`${title}/read/${chTitle}`}>
                                        {chTitle}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    ) : (
                        <h1>nothing found...</h1>
                    );
                }}
            </Query>
        </div>
    );
};

export default Details;
