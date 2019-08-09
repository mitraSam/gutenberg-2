import React from 'react';
import {Query} from 'react-apollo';
import {GET_READING_BOOK} from '../Queries';
import {css} from '@emotion/core';
import parse from 'html-react-parser';
import Container from './SwipeContainer';
const Chapter = ({title, chapterNr, pageNr, navigate}) => {
    return (
        <div>
            <Query query={GET_READING_BOOK} variables={{title, chapterNr: chapterNr - 1}}>
                {({data, loading}) => {
                    if (loading) {
                        return (
                            <div
                                css={css`
                                    display: flex;
                                `}>
                                <div
                                    css={css`
                                        position: relative;
                                        display: inline-block;
                                        margin: 0 auto;
                                    `}></div>
                                <h1>loading</h1>
                            </div>
                        );
                    } else {
                        const {bookDetails, bookChapter} = data;
                        const {title, author, tableOfContents, pagesNr, epigraph} = bookDetails;
                        const {pages, pagination} = bookChapter;

                        const pageIndex = Number(pageNr) - pagination[0];
                        return (
                            <div
                                css={css`
                                    overflow: hidden;
                                `}>
                                {pageNr > 0 ? (
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
                                            <Container
                                                key={pageNr}
                                                navigate={navigate}
                                                pageNr={Number(pageNr)}
                                                title={title}
                                                chapterNr={chapterNr}
                                                author={author}
                                                totalPages={pagesNr}
                                                chapterPages={pagination}
                                                tableOfContents={tableOfContents}
                                                page={pages[pageIndex].content}
                                                prevPage={pages[pageIndex - 1] ? pages[pageIndex - 1].content : null}
                                                nextPage={pages[pageIndex + 1] ? pages[pageIndex + 1].content : null}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    parse(epigraph)
                                )}
                            </div>
                        );
                    }
                }}
            </Query>
        </div>
    );
};

export default Chapter;
