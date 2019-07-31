import React, {useState} from 'react';
import parse from 'html-react-parser';
import {css} from '@emotion/core';
import {Swipeable} from 'react-swipeable';

const Container = ({page}) => {
    const [point, updatePoint] = useState(0);
    const [opacity, updateOpacity] = useState(1);
    const swipedLeft = ({deltaX}) => {
        const percentage = Math.abs(deltaX) / window.innerWidth;
        if (percentage < 0.5) {
            updatePoint(0);
            updateOpacity(1);
        }
    };
    const swipedRight = ({deltaX}) => {
        const percentage = Math.abs(deltaX) / window.innerWidth;
        if (percentage < 0.5) {
            updatePoint(0);
            updateOpacity(1);
        }
    };

    return (
        <Swipeable
            onSwipedLeft={swipedLeft}
            onSwipedRight={swipedRight}
            onSwiping={({deltaX}) => {
                updatePoint(deltaX);
                updateOpacity(1 - Math.abs(deltaX) / window.innerWidth);
            }}>
            <div
                style={{transform: `translate3d(${point + 'px'},0,0)`, opacity: `${opacity}`}}
                css={css`
                    transition: transform 0.1s;
                    background: var(--off-white);
                `}>
                {parse(page)}
            </div>
        </Swipeable>
    );
};

export default Container;
