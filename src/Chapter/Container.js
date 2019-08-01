import React, {useState, useEffect} from 'react';
import parse from 'html-react-parser';
import {css} from '@emotion/core';
import {Swipeable} from 'react-swipeable';

const Container = ({page, navigate}) => {
    const [content, updateContent] = useState(page);
    useEffect(() => {
        console.log('usiing effect');
    }, [page]);
    const [point, updatePoint] = useState(0);
    const [opacity, updateOpacity] = useState(1);

    const swipedLeft = ({deltaX}) => {
        const percentage = Math.abs(deltaX) / window.innerWidth;
        console.log(percentage);
        if (percentage < 0.2) {
            updatePoint(0);
            updateOpacity(1);
            return;
        }
        updatePoint(window.innerWidth);
        navigate('/BRAVE NEW WORLD/1/3');
    };
    const swipedRight = ({deltaX}) => {
        const percentage = Math.abs(deltaX) / window.innerWidth;
        console.log(percentage);
        if (percentage < 0.2) {
            updatePoint(0);
            updateOpacity(1);
            return;
        }
        console.log('right', -window.innerWidth);
        updatePoint(-window.innerWidth);
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
                {parse(content)}
            </div>
        </Swipeable>
    );
};

export default Container;
