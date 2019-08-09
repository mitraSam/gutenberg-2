import React from 'react';
import {Query} from 'react-apollo';
import {css} from '@emotion/core';
import {Link} from '@reach/router';
import {GET_BOOK_DETAILS} from '../Queries';
import Subtitle from '../Subtitle/Subtitle';

const Details = ({title}) => {
    return (
        <div
            css={css`
                @media (min-width: 75em) {
                    margin-left: 1.4em;
                }
            `}>
            <Subtitle text="book details" />
            <Query query={GET_BOOK_DETAILS} variables={{title}} fetchPolicy="network-only">
                {({data, loading}) => {
                    const {bookDetails} = data;
                    if (bookDetails)
                        var {
                            title,
                            author,
                            credits,
                            license,
                            source,
                            wikiData,
                            tableOfContents,
                            epigraph,
                        } = bookDetails;
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
                                to={`/${title}/1/${epigraph ? 0 : 1}`}
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

                            <Subtitle text="from wikipedia" />
                            <p>{wikiData}</p>
                            <Subtitle text="credits" />
                            {credits.map(credit => (
                                <p key={credit}>{credit}</p>
                            ))}
                            <Subtitle text="license" />

                            <p>{license}</p>
                            <p>
                                You can also read the original{' '}
                                <Link
                                    to={source}
                                    css={css`
                                        border-bottom: 1px solid var(--action-color);
                                    `}>
                                    here
                                </Link>
                            </p>
                            <Subtitle text="chapters" />

                            {tableOfContents.map((ch, i) => (
                                <p key={ch.title}>
                                    <Link
                                        css={css`
                                            border-bottom: 1px solid var(--action-color);
                                        `}
                                        to={`/${title}/${i + 1}/${ch.pagination[0]}`}>
                                        {ch.title}
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
