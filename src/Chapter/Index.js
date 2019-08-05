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
                        return <h1>loading</h1>;
                    } else {
                        const {bookDetails, bookChapter} = data;
                        const {title, author, chapterTitles, pagesNr, epigraph} = bookDetails;
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
                                                chapterPages={pagination}
                                                chapterTitles={chapterTitles}
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
