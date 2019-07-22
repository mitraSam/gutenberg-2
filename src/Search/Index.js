import React from 'react';
import {Query} from 'react-apollo';
import {css} from '@emotion/core';
import {SEARCH_QUERY} from '../Queries';
import Preview from '../Preview';

const Search = ({param}) => {
    return (
        <div
            css={css`
                @media (min-width: 75em) {
                    margin-left: 1.4em;
                }
            `}>
            <h2
                css={css`
                    font-family: var(--id-font);
                `}>
                results for {param}:
            </h2>
            <Query query={SEARCH_QUERY} variables={{param}} fetchPolicy="network-only">
                {({data, loading}) => {
                    const {search} = data;
                    return loading ? (
                        <h2>loading</h2>
                    ) : (
                        <div>
                            {search.length ? (
                                search.map(book => <Preview key={book.title} title={book.title} author={book.author} />)
                            ) : (
                                <h2>no results found....</h2>
                            )}
                        </div>
                    );
                }}
            </Query>
        </div>
    );
};
export default Search;
