import React from 'react';
import {css} from '@emotion/core';

const Subtitle = ({text}) => {
    const subtitle = css`
        font-family: var(--id-font);
    `;
    return (
        <h2
            css={css`
                ${subtitle};
            `}>
            {text}
        </h2>
    );
};

export default Subtitle;
