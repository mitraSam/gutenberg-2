import React from 'react';
import {Query} from 'react-apollo';
import {SEARCH_QUERY} from '../Queries';
import Preview from '../Preview/Preview';

export const Search = ({param}) => {
    return (
        <div>
            <h2>results for {param}:</h2>
            <Query query={SEARCH_QUERY} variables={{param}} fetchPolicy="network-only">
                {({data, loading}) => {
                    const {search} = data;
                    return loading ? (
                        <h2>loading</h2>
                    ) : (
                        <div className="inverse">
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
