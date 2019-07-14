import React from 'react';
import {css} from '@emotion/core';

const NavForm = () => (
    <form>
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
            placeholder="search..."
            type="text"
        />
    </form>
);

export default NavForm;
