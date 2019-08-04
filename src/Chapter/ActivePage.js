import React from 'react';
import {Swipeable} from 'react-swipeable';
import {css} from '@emotion/core';

import parse from 'html-react-parser';

const ActivePage = ({point, opacity, pageNr, page, swipeEnd, transitionEnd, swiping}) => {
    return (
        <Swipeable
            css={css`
                position: relative;
                z-index: 3;
            `}
            onSwipedLeft={swipeEnd}
            onSwipedRight={swipeEnd}
            onSwiping={swiping}>
            <div
                style={{transform: `translate3d(${point + 'px'},0,0)`, opacity: `${opacity}`}}
                css={css`
                    transition: transform 0.1s;
                    @media screen and (min-width: 60.25em) {
                        transition: transform 0.4s;
                    }
                    background: var(--off-white);
                `}
                onTransitionEnd={transitionEnd}>
                <h2>{pageNr}</h2>

                {parse(page)}
            </div>
        </Swipeable>
    );
};
export default ActivePage;
