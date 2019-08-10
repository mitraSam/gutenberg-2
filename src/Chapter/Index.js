import React from 'react';
import {Query} from 'react-apollo';
import {GET_READING_BOOK} from '../Queries';
import {css} from '@emotion/core';
import Container from './SwipeContainer';
import PagePlaceholder from './PagePlaceholder';
import DetailsContext from './DetailsContext';
const Chapter = ({title, chapterNr, pageNr, navigate}) => {
    return (
        <div>
            <Query query={GET_READING_BOOK} variables={{title, chapterNr: chapterNr - 1}}>
                {({data, loading}) => {
                    if (loading) {
                        return <PagePlaceholder />;
                    } else {
                        const {bookDetails, bookChapter} = data;

                        const {pagesNr} = bookDetails;
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
                                            <DetailsContext.Provider
                                                value={{
                                                    ...bookDetails,
                                                    chapterNr: Number(chapterNr),
                                                    navigate,
                                                    pageNr: Number(pageNr),
                                                    totalPages: pagesNr,
                                                    chapterPages: pagination,
                                                }}>
                                                <Container
                                                    key={pageNr}
                                                    page={pages[pageIndex].content}
                                                    prevPage={
                                                        pages[pageIndex - 1] ? pages[pageIndex - 1].content : null
                                                    }
                                                    nextPage={
                                                        pages[pageIndex + 1] ? pages[pageIndex + 1].content : null
                                                    }
                                                />
                                            </DetailsContext.Provider>
                                        </div>
                                    </div>
                                ) : (
                                    <p>what</p>
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
