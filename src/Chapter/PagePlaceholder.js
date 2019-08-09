import React from 'react';
import {css} from '@emotion/core';
const PagePlaceholder = () => (
    <div
        css={css`
            display: flex;
        `}>
        <div
            css={css`
                position: relative;
                display: inline-block;
                margin: 0 auto;
            `}>
            <h1
                css={css`
                    width: 16em;
                `}>
                loading
            </h1>
        </div>
    </div>
);

export default PagePlaceholder;
