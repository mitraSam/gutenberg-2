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
            tableOfContents {
                title
                pagination
            }
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
            tableOfContents {
                title
                pagination
            }
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

export const UPLOAD_BOOK = gql`
    mutation uploadBook($input: UploadBookInput!) {
        uploadBook(input: $input) {
            author
            title
        }
    }
`;
export const BOOK_UPLOAD_SUB = gql`
    subscription {
        uploadingBook {
            message
        }
    }
`;

export const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        loginUser(username: $username, password: $password)
    }
`;

export const SIGNUP_MUTATION = gql`
    mutation signup($username: String!, $password: String) {
        registerUser(username: $username, password: $password)
    }
`;
export const BOOKMARK_MUTATION = gql`
    mutation bookmarkPage($username: String!, $title: String!, $author: String!, $chapterNr: Int!, $pageNr: Int!) {
        bookmarkPage(username: $username, title: $title, author: $author, chapterNr: $chapterNr, pageNr: $pageNr)
    }
`;
export const READ_BOOKS = gql`
    query readBooks($username: String!) {
        readBooks(username: $username) {
            title
            author
            chapterNr
            pageNr
        }
    }
`;
