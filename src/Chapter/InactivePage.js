import React from 'react';
import parse from 'html-react-parser';
import {css} from '@emotion/core';

const InactivePage = ({pageNr, point, page, lastChapterPage, nextChapterTitle}) => {
    return (
        <div>
            {page ? (
                <div
                    css={css`
                        position: absolute;
                        top: 0;
                        background: var(--off-white);
                        z-index: ${point};
                        display: ${point ? 'block' : 'none'};
                    `}>
                    <h2>{pageNr}</h2>

                    {parse(page)}
                </div>
            ) : (
                <div
                    css={css`
                        position: absolute;
                        width: 100vw;
                        height: 100vh;
                        top: 0;
                        background: var(--off-white);
                        z-index: ${point};
                    `}>
                    {lastChapterPage && (
                        <div>
                            <h2>{pageNr}</h2>
                            <h2>{nextChapterTitle}</h2>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default InactivePage;
