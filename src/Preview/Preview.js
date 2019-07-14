import React from 'react';
import {Link} from '@reach/router';
import {css} from '@emotion/core';

const Preview = ({title, author}) => (
    <div>
        <h2
            className="title"
            css={css`
                margin-bottom: 0.3em;
                line-height: 1.3;
            `}>
            <Link
                css={css`
                    border-bottom: 1px solid var(--action-color);
                `}
                to={`${title}/details`}>
                {title}
            </Link>
        </h2>
        <h2>by {author}</h2>
    </div>
);

export default Preview;
