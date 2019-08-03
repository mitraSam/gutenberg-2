import React, {Component} from 'react';
import parse from 'html-react-parser';
import {css} from '@emotion/core';
import {Swipeable} from 'react-swipeable';
class SwipeContainer extends Component {
    state = {
        opacity: 1,
        point: 0,
        swipeLeft: false,
        swipeRight: false,
    };

    componentDidMount() {
        this.setArrowNav();
    }

    swipeEnd = ({deltaX}) => {
        const percentage = Math.abs(deltaX) / window.innerWidth;
        if (percentage < 0.3) {
            this.setState({point: 0, opacity: 1});

            return;
        }
        if (deltaX > 1) {
            this.setState({point: window.innerWidth, swipeRight: true});
            return;
        }
        this.setState({point: -window.innerWidth, swipeLeft: true});
    };

    setArrowNav = () => {
        window.onkeydown = evt => {
            if (evt.key === 'ArrowRight') this.setState({point: window.innerWidth, swipeRight: true});

            if (evt.key === 'ArrowLeft') this.setState({point: -window.innerWidth, swipeLeft: true});
        };
    };
    transitionEnd = () => {
        const {swipeLeft, swipeRight} = this.state;
        if (!swipeLeft && !swipeRight) return;
        const {title, chapterNr, pageNr} = this.props;

        if (swipeLeft) {
            if (pageNr === 1) return this.setState({point: 0, opacity: 1, swipeLeft: false});

            return this.props.navigate(`/${title}/${chapterNr}/${pageNr - 1}`);
        }

        return this.props.navigate(`/${title}/${chapterNr}/${pageNr + 1}`);
    };
    swiping = ({deltaX}) => {
        this.setState({point: deltaX, opacity: 1 - Math.abs(deltaX) / window.innerWidth});
    };
    render() {
        const {point, opacity} = this.state;
        const {page, prevPage, nextPage, pageNr} = this.props;
        return (
            <div>
                <Swipeable
                    css={css`
                        position: relative;
                        z-index: 3;
                    `}
                    onSwipedLeft={this.swipeEnd}
                    onSwipedRight={this.swipeEnd}
                    onSwiping={this.swiping}>
                    <div
                        style={{transform: `translate3d(${point + 'px'},0,0)`, opacity: `${opacity}`}}
                        css={css`
                            transition: transform 0.1s;
                            background: var(--off-white);
                        `}
                        onTransitionEnd={this.transitionEnd}>
                        <h2>{pageNr}</h2>

                        {parse(page)}
                    </div>
                </Swipeable>
                {nextPage && (
                    <div
                        css={css`
                            position: absolute;
                            top: 0;
                            background: var(--off-white);
                            z-index: ${point > 1 ? 2 : 0};
                        `}>
                        <h2>{pageNr + 1}</h2>

                        {parse(nextPage)}
                    </div>
                )}
                {prevPage ? (
                    <div
                        css={css`
                            position: absolute;
                            top: 0;
                            background: var(--off-white);
                            z-index: ${point > 1 ? 0 : 2};
                        `}>
                        <h2>{pageNr - 1}</h2>

                        {parse(prevPage)}
                    </div>
                ) : (
                    <div
                        css={css`
                            position: absolute;
                            width: 100vw;
                            height: 100vh;
                            top: 0;
                            background: var(--off-white);
                            z-index: ${point > 1 ? 0 : 2};
                        `}></div>
                )}
            </div>
        );
    }
}
export default SwipeContainer;
