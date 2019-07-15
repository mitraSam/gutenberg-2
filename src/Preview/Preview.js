import React from 'react';
import {Link} from '@reach/router';
import {css} from '@emotion/core';

const Preview = ({title, author}) => (
    <div>
        <Link
            to={`${title}/details`}
            css={css`
                border-bottom: 1px solid var(--action-color);
                display: block;
                @media (min-width: 60.25em) {
                    width: 52em;
                }
                @media (min-width: 75em) {
                    width: 64em;
                }
            `}>
            <h2
                className="title"
                css={css`
                    margin-bottom: 0em;
                    line-height: 1.3;
                    margin-top: 0.5em;
                `}>
                {title}
            </h2>
            <h2
                css={css`
                    margin-top: 0;
                `}>
                by {author}
            </h2>
        </Link>
    </div>
);

export default Preview;
