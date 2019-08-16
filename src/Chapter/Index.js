import React, {useEffect} from 'react';
import {Query, useMutation} from 'react-apollo';
import {GET_READING_BOOK, BOOKMARK_MUTATION} from '../Queries';
import {css} from '@emotion/core';
import Container from './SwipeContainer';
import UserContext from '../Contexts/UserContext';
import PagePlaceholder from './PagePlaceholder';
import DetailsContext from './DetailsContext';
const Chapter = ({title, chapterNr, pageNr, navigate}) => {
    let username = null;
    const [bookmark, {}] = useMutation(BOOKMARK_MUTATION);

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
                        useEffect(() => {
                            if (username) {
                                bookmark({
                                    variables: {
                                        username,
                                        title,
                                        author: bookDetails.author,
                                        chapterNr: Number(chapterNr),
                                        pageNr: Number(pageNr),
                                    },
                                }).catch(e => console.log(JSON.stringify(e)));
                            }
                        }, [pageNr]);
                        return (
                            <div
                                css={css`
                                    overflow: hidden;
                                `}>
                                <UserContext.Consumer>
                                    {({user: {name}}) => {
                                        if (name) {
                                            username = name;
                                        }
                                    }}
                                </UserContext.Consumer>
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
