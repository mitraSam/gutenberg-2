import React from 'react';
import {css} from '@emotion/core';
import {Query} from 'react-apollo';
import {RECENT_BOOKS} from '../Queries';
import Preview from '../Preview/Index';
import ActionLink from '../ActionLink/Index';
const Landing = () => (
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
            latest titles
        </h2>
        <Query query={RECENT_BOOKS} fetchPolicy="network-only">
            {({data, loading}) =>
                loading ? (
                    <h2>loading</h2>
                ) : (
                    data.recentBooks.map(book => <Preview key={book.title} title={book.title} author={book.author} />)
                )
            }
        </Query>
        <ActionLink to="/upload" text="upload" />
    </div>
);
export default Landing;
