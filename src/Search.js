import React from 'react';
import {Query} from 'react-apollo';
import {SEARCH_QUERY, GET_BOOK_DETAILS} from './Queries';
import Preview from './Preview/Preview';

export const Search = ({param}) => {
    console.log(param);

    return (
        <div>
            <h2>results for {param}:</h2>
            <Query query={SEARCH_QUERY} variables={{param}} fetchPolicy="network-only">
                {({data, loading}) => {
                    console.log(data);
                    const {search} = data;
                    return loading ? (
                        <h2>loading</h2>
                    ) : (
                        <div className="inverse">
                            {search.length ? (
                                search.map(book => <Preview title={book.title} author={book.author} />)
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
