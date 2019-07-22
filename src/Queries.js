import {gql} from 'apollo-boost';

export const SEARCH_QUERY = gql`
    query search($param: String!) {
        search(param: $param) {
            title
            author
        }
    }
`;
export const RECENT_BOOKS = gql`
    query recentBooks {
        recentBooks {
            title
            author
        }
    }
`;

export const GET_BOOK_DETAILS = gql`
    query bookDetails($title: String!) {
        bookDetails(title: $title) {
            title
            author
            credits
            source
            wikiData
            license
            chapterTitles
            source
            epigraph
        }
    }
`;

export const GET_READING_BOOK = gql`
    query readingBook($title: String!, $chapterNr: Int!) {
        bookDetails(title: $title) {
            title
            author
            chapterTitles
            pagesNr
            epigraph
        }
        bookChapter(title: $title, chapterNr: $chapterNr) {
            title
            pagination
            pages {
                pageNr
                content
            }
        }
    }
`;
