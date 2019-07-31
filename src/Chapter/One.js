import React, {useState} from 'react';
import {Query} from 'react-apollo';
import {GET_READING_BOOK, GET_OPEN_BOOK} from '../Queries';
import {navigate} from '@reach/router';
import {css} from '@emotion/core';
import {spring} from 'popmotion';
import posed, {PoseGroup} from 'react-pose';

import parse from 'html-react-parser';
import Container from './Container';
const Chapter = ({title, chapterNr, pageNr, navigate}) => {
    let point = 0;
    return (
        <div>
            <Query query={GET_READING_BOOK} variables={{title, chapterNr: chapterNr - 1}}>
                {({data, loading}) => {
                    console.log(data);
                    if (loading) {
                        return <h1>loading</h1>;
                    } else {
                        const {bookDetails, bookChapter} = data;
                        const {title, author, chapterTitles, pagesNr, epigraph} = bookDetails;
                        const {pages} = bookChapter;

                        return (
                            <div
                                css={css`
                                    overflow: hidden;
                                `}>
                                {pageNr > 0 ? (
                                    <div>
                                        <h2>{pageNr}</h2>
                                        <div
                                            css={css`
                                                position: relative;
                                            `}>
                                            <Container page={pages[pageNr - 1].content} />
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
