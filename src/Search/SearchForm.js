import React, {useState} from 'react';
import {css} from '@emotion/core';

import {navigate} from '@reach/router';

const NavForm = ({update, onSubmit}) => {
    const [searchTerm, updateSearchTerm] = useState('');
    function handleSearch(e) {
        e.preventDefault();
        onSubmit ? onSubmit() : null;
        navigate(`/search/${searchTerm}`);
    }
    return (
        <form onSubmit={handleSearch}>
            <input
                tabIndex={1}
                onFocus={() => (update ? update(true) : null)}
                onBlur={() => (update ? update(false) : null)}
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
