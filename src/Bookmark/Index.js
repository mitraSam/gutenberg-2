import React, {Component} from 'react';
import {css} from '@emotion/core';
import {Link} from '@reach/router';
import DetailsContext from '../Contexts/DetailsContext';
import UserContext from '../Contexts/UserContext';
class Bookmark extends Component {
    static contextType = DetailsContext;
    state = {
        currentChapter: this.context.tableOfContents[this.context.chapterNr - 1].title,
    };
    handleChapterChange = ({target}) => {
        const {selectedIndex} = target.options;
        const {tableOfContents, navigate, title} = this.context;
        const selectedChapter = tableOfContents[selectedIndex];
        this.setState({currentChapter: selectedChapter.title});
        navigate(`/${title}/${selectedIndex + 1}/${selectedChapter.pagination[0]}`);
    };
    active = css`
        transform: translate(0, 0);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    `;
    render() {
        const {show} = this.props;
        const {currentChapter} = this.state;
        const {author, title, totalPages, tableOfContents} = this.context;

        return (
            <UserContext.Consumer>
                {({user: {name}}) => {
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
                                max-width: 23rem;
                                ${show ? this.active : ''}
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
                            {name && (
                                <h2>
                                    logged in as
                                    <Link
                                        css={css`
                                            border-bottom: 1px solid var(--action-color);
                                        `}
                                        to="/user">
                                        {' '}
                                        {name}
                                    </Link>
                                </h2>
                            )}
                            <h1
                                css={css`
                                    margin-bottom: 0;
                                    @media screen and (min-width: 60.25em) {
                                        --h1-font-size-min: 4;
                                    }
                                `}>
                                {title}
                            </h1>
                            <h2>by {author}</h2>
                            <p>pages: {totalPages}</p>
                            <p>chapters:</p>
                            <select onChange={this.handleChapterChange} value={currentChapter}>
                                {tableOfContents.map(({title, pagination}, i) => (
                                    <option data-index={i} key={title} value={title}>
                                        {title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                }}
            </UserContext.Consumer>
        );
    }
}
export default Bookmark;
