import React, {useState} from 'react';
import {css} from '@emotion/core';
import {Query} from 'react-apollo';
import {SEARCH_QUERY} from '../Queries';
import {navigate} from '@reach/router';

const NavForm = () => {
    const [searchTerm, updateSearchTerm] = useState('');
    function handleSearch(e) {
        e.preventDefault();
    }
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                navigate(`/search/${searchTerm}`);
            }}>
            <input
                tabIndex={1}
                onFocus={e => e.currentTarget.parentNode.parentNode.classList.add('active')}
                onBlur={e => e.currentTarget.parentNode.parentNode.classList.remove('active')}
                css={css`
                    font-family: var(--id-font);
                    font-size: 1em;
                    border: none;
                    width: 100%;
                    color: var(--dark-gray);
                    padding: 0.7em 0 0;
                    background: #fbfbf6;
                    @media (min-width: 60.25em) {
                        width: 8em;
                    }
                `}
                value={searchTerm}
                onChange={e => updateSearchTerm(e.target.value)}
                placeholder="search..."
                type="text"
            />
        </form>
    );
};
export default NavForm;
