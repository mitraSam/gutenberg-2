import React from 'react';
import {Link} from '@reach/router';
import {css} from '@emotion/core';
const ActionLink = props => (
    <h2
        css={css`
            display: inline-block;
        `}>
        <Link
            css={css`
                border: 1px solid var(--action-color);
                border-radius: 5px;
                padding: 0.4em;
                font-family: var(--id-font);
                &:hover {
                    color: #fff;
                    background: var(--dark-gray);
                    border-color: transparent;
                }
            `}
            to={props.to}
            {...props}>
            {props.text}
        </Link>
    </h2>
);

export default ActionLink;
