import React, {useState} from 'react';
import {Query} from 'react-apollo';
import {GET_READING_BOOK, GET_OPEN_BOOK} from '../Queries';
import {navigate} from '@reach/router';
import {css} from '@emotion/core';
import {spring} from 'popmotion';
import posed, {PoseGroup} from 'react-pose';

import parse from 'html-react-parser';
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
                        const Box = posed.div({
                            draggable: 'x',
                            dragEnd: {
                                x: ({element: {clientWidth}}) => {
                                    const percentage = (Math.abs(point) / clientWidth) * 100;
                                    if (percentage < 40) return 0;
                                    else {
                                        navigate(`/${title}/${chapterNr}/${Number(pageNr) + 1}`);
                                    }
                                },
                                transition: ({from, to, velocity}) =>
                                    spring({
                                        from,
                                        to,
                                        stiffness: 750,

                                        damping: 400,
                                    }),
                            },
                        });

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
                                            <Box
                                                transitioned={() => console.log('done?')}
                                                key="box"
                                                css={css`
                                                    background: var(--off-white);
                                                    position: relative;
                                                    z-index: 1;
                                                `}
                                                onValueChange={{
                                                    x: x => {
                                                        x ? (point = x) : '';
                                                    },
                                                }}>
                                                {parse(pages[pageNr - 1].content)}
                                            </Box>
                                            <Box
                                                css={css`
                                                    position: absolute;
                                                    top: 0;
                                                    p:first-of-type {
                                                        margin-top: 0;
                                                    }
                                                `}
                                                onValueChange={{
                                                    x: x => {
                                                        x ? (point = x) : '';
                                                    },
                                                }}>
                                                {parse(pages[pageNr].content)}
                                            </Box>
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
