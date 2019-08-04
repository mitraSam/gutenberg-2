import React, {Component} from 'react';
import ActivePage from './ActivePage';
import InactivePage from './InactivePage';
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

    swipedRight = () => this.setState({point: window.innerWidth, swipeRight: true});
    swipedLeft = () => this.setState({point: -window.innerWidth, swipeLeft: true});

    swipeEnd = ({deltaX}) => {
        const percentage = Math.abs(deltaX) / window.innerWidth;
        if (percentage < 0.3) {
            this.setState({point: 0, opacity: 1});

            return;
        }
        window.scrollTo(0, 0);

        if (deltaX > 1) {
            this.swipedRight();
            return;
        }
        this.swipedLeft();
    };
    navigateToPage = pageNr => {
        const {title, chapterNr} = this.props;

        this.props.navigate(`/${title}/${chapterNr}/${pageNr}`);
    };
    setArrowNav = () => {
        const keys = ['ArrowRight', 'ArrowLeft'];
        const callBacks = {
            ArrowRight: this.swipedRight,
            ArrowLeft: this.swipedLeft,
        };
        window.onkeydown = ({key}) => {
            if (keys.includes(key)) {
                window.scrollTo(0, 0);
                callBacks[key]();
            }
        };
    };
    transitionEnd = () => {
        const {swipeLeft, swipeRight} = this.state;
        if (!swipeLeft && !swipeRight) return;
        const {pageNr} = this.props;

        if (swipeLeft) {
            if (pageNr === 1) return this.setState({point: 0, opacity: 1, swipeLeft: false});
            return this.navigateToPage(pageNr - 1);
        }

        return this.navigateToPage(pageNr + 1);
    };
    swiping = ({deltaX}) => {
        this.setState({point: deltaX, opacity: 1 - Math.abs(deltaX) / window.innerWidth});
    };
    render() {
        const {point, opacity} = this.state;
        const {page, prevPage, nextPage, pageNr} = this.props;

        return (
            <div>
                <ActivePage
                    swipeEnd={this.swipeEnd}
                    transitionEnd={this.transitionEnd}
                    swiping={this.swiping}
                    point={point}
                    opacity={opacity}
                    pageNr={pageNr}
                    page={page}
                />

                {nextPage ? (
                    <InactivePage page={nextPage} pageNr={pageNr + 1} point={point > 1 ? 2 : 0} />
                ) : (
                    <InactivePage point={point > 1 ? 2 : 0} />
                )}
                {prevPage ? (
                    <InactivePage page={prevPage} pageNr={pageNr - 1} point={point > 1 ? 0 : 2} />
                ) : (
                    <InactivePage point={point > 1 ? 0 : 2} />
                )}
            </div>
        );
    }
}
export default SwipeContainer;
