import React, {useState} from 'react';
import {css} from '@emotion/core';
import {Link} from '@reach/router';

const Bookmark = ({show, title, author, tableOfContents, chapterNr, totalPages, navigate}) => {
    const active = css`
        transform: translate(0, 0);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    `;
    const [currentChapter, selectChapter] = useState(tableOfContents[Number(chapterNr) - 1].title);
    const handleChapterChange = ({target}) => {
        const {selectedIndex} = target.options;
        const selectedChapter = tableOfContents[selectedIndex];
        selectChapter(selectedChapter.title);
        navigate(`/${title}/${selectedIndex + 1}/${selectedChapter.pagination[0]}`);
    };
    return (
        <div
            onClick={e => e.stopPropagation()}
            css={css`
                background-color: var(--off-white);
                font-size: 0.8em;
                transform: translate(0, -105%);
                transition: transform 0.5s;
                position: absolute;
                border: 1px solid var(--dark-gray);
                top: 0;
                padding: 2em;
                right: 0;
                ${show ? active : ''}
            `}>
            <Link
                css={css`
                    font-family: var(--id-font);
                    font-size: 1.8em;
                    margin-bottom: 1.5em;
                    display: inline-block;
                `}
                to="/">
                gutenberg's den
            </Link>{' '}
            <h1
                css={css`
                    margin-bottom: 0;
                `}>
                {title}
            </h1>
            <h2>{author}</h2>
            <p>pages: {totalPages}</p>
            <p>chapters:</p>
            <select onChange={handleChapterChange} value={currentChapter}>
                {tableOfContents.map(({title, pagination}, i) => (
                    <option data-index={i} key={title} value={title}>
                        {title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Bookmark;
