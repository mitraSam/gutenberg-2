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
            url
            source
            wikiData
            license
            chapterTitles
        }
    }
`;
