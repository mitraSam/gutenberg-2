import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from '@reach/router';
import {ApolloProvider} from 'react-apollo';
import {persistCache} from 'apollo-cache-persist';
import {InMemoryCache, HttpLink, ApolloLink, ApolloClient, split} from 'apollo-boost';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {createUploadLink} from 'apollo-upload-client';
import '../styles/main.scss';
import {Search} from '../Search/Search';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import Main from '../Main/Main';
import Landing from '../Landing/Landing';
import Details from '../Details/Details';
const httpLink = createUploadLink({
    uri: 'http://localhost:3000/graphql',
});

const cache = new InMemoryCache();

const wsLink = new WebSocketLink({
    uri: `ws://localhost:3000/graphql`,
    options: {reconnect: true},
});

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(context => ({
        headers: {
            ...context.headers,
            authorization: localStorage.getItem('token'),
        },
    }));
    return forward(operation);
});

const httpAuthLink = authLink.concat(httpLink);

const link = split(
    ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpAuthLink
);

const setupAndRender = async () => {
    await persistCache({
        cache,
        storage: localStorage,
    });

    if (localStorage['apollo-cache-persist']) {
        let cacheData = JSON.parse(localStorage['apollo-cache-persist']);
        cache.restore(cacheData);
    }

    const client = new ApolloClient({
        cache,
        link,
    });
    class App extends React.Component {
        render() {
            return (
                <ApolloProvider client={client}>
                    <div>
                        <div>
                            <Router>
                                <Header path="/*" />
                            </Router>
                        </div>
                        <Router>
                            <Main path="/">
                                <Search path="/search/:param" />
                                <Landing path="/" />
                                <Details path="/details/:title" />
                                <NotFound default />
                            </Main>
                        </Router>
                    </div>
                </ApolloProvider>
            );
        }
    }

    ReactDOM.render(<App />, document.getElementById('root'));
};
setupAndRender();
