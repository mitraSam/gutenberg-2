import React, {Component} from 'react';
import ActivePage from './ActivePage';
import InactivePage from './InactivePage';
import DetailsContext from './DetailsContext';
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
    static contextType = DetailsContext;
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
    navigateToPage = (title, chapterNr, pageNr) => this.context.navigate(`/${title}/${chapterNr}/${pageNr}`);

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
    handlePageNavigation = pageNr => {
        const {chapterPages, chapterNr, title} = this.context;
        if (pageNr === chapterPages[1] + 1) {
            return this.navigateToPage(title, Number(chapterNr) + 1, pageNr);
        }
        if (pageNr === chapterPages[0] - 1) {
            return this.navigateToPage(title, Number(chapterNr) - 1, pageNr);
        }
        this.navigateToPage(title, chapterNr, pageNr);
    };
    transitionEnd = () => {
        const {swipeLeft, swipeRight} = this.state;
        if (!swipeLeft && !swipeRight) return;
        const {pageNr} = this.context;

        if (swipeLeft) {
            if (pageNr === 1) return this.setState({point: 0, opacity: 1, swipeLeft: false});
            return this.handlePageNavigation(pageNr - 1);
        }
        if (pageNr === this.context.totalPages) return this.setState({point: 0, opacity: 1, swipeRight: false});
        return this.handlePageNavigation(pageNr + 1);
    };
    swiping = ({deltaX}) => {
        this.setState({point: deltaX, opacity: 1 - Math.abs(deltaX) / window.innerWidth});
    };

    render() {
        const {point, opacity} = this.state;
        const {page, prevPage, nextPage} = this.props;
        const {pageNr, chapterNr, tableOfContents, totalPages, chapterPages} = this.context;

        const lastChapterPage = pageNr === chapterPages[1];
        const nextChapterTitle = tableOfContents[chapterNr] ? tableOfContents[chapterNr].title : null;
        const onLastPage = pageNr === totalPages;
        return (
            <div>
                <ActivePage
                    swipeEnd={this.swipeEnd}
                    transitionEnd={this.transitionEnd}
                    swiping={this.swiping}
                    point={point}
                    opacity={opacity}
                    page={page}
                    pageNr={pageNr}
                />
                {!onLastPage && (
                    <InactivePage
                        lastChapterPage={lastChapterPage}
                        nextChapterTitle={nextChapterTitle}
                        page={nextPage}
                        pageNr={pageNr + 1}
                        point={point > 0 ? 2 : 0}
                    />
                )}
                <InactivePage
                    lastChapterPage={lastChapterPage}
                    nextChapterTitle={nextChapterTitle}
                    page={prevPage}
                    pageNr={pageNr - 1}
                    point={point >= 0 ? 0 : 2}
                />
            </div>
        );
    }
}
export default SwipeContainer;
