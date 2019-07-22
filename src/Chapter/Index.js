import React from 'react';
import {Query} from 'react-apollo';
import {GET_READING_BOOK, GET_OPEN_BOOK} from '../Queries';
import {css} from '@emotion/core';
import {spring} from 'popmotion';
import posed from 'react-pose';

import parse from 'html-react-parser';
const Chapter = ({title, chapterNr, pageNr}) => (
    <div>
        <Query query={GET_READING_BOOK} variables={{title, chapterNr: --chapterNr}}>
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
                            x: (x)=>{console.log(x,'EEEEEEEEEEEEEEEE')},
                            transition: ({from, to, velocity}) =>
                                spring({from, to, velocity, stiffness: 750, damping: 50}),
                        },
                    });

                    return (
                        <div>
                            {pageNr > 0 ? (
                                <div>
                                    <h2>{pageNr}</h2>
                                    <Box
                                        onDragStart={x => console.log('staring drag ', x)}
                                        onDragEnd={x => console.log('ending drag', x)}
                                        onValueChange={{x: x => console.log('changing', x)}}>
                                        {parse(pages[pageNr - 1].content)}
                                    </Box>
                                    <div>{parse(pages[pageNr - 2].content)}</div>
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

export default Chapter;
