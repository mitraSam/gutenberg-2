import React, {useState} from 'react';
import {css} from '@emotion/core';

const Header = ({pageNr, setBookmark, showBookmark}) => {
    const [activeBtn, setBtn] = useState(false);
    const activeBtnCss = css`
        opacity: 1;
        cursor: pointer;
        border-color: transparent;
        color: #fff;
        background: var(--dark-gray);
    `;
    const handleBookmarkBtn = () => {
        setBtn(!activeBtn);
        setBookmark(!showBookmark);
    };
    return (
        <div
            css={css`
                display: flex;
            `}>
            <h2>{pageNr}</h2>

            <h2
                css={css`
                    margin-left: auto;
                `}>
                <button
                    onClick={handleBookmarkBtn}
                    css={css`
                        font-size: inherit;
                        padding: 0.1em 0.6em;
                        border: 1px solid var(--action-color);
                        border-radius: 5px;
                        padding: 0.1em 0.6em;
                        opacity: 0.5;
                        transition: opacity 0.2s;
                        z-index: 2;
                        position: relative;
                        ${activeBtn ? activeBtnCss : ''}
                        &:hover {
                            ${activeBtnCss}
                        }
                    `}>
                    i
                </button>
            </h2>
        </div>
    );
};

export default Header;
