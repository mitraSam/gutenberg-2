import React from 'react';
import ReactDOM from 'react-dom';
import {Match, Router} from '@reach/router';
import {ApolloProvider} from 'react-apollo';
import {persistCache} from 'apollo-cache-persist';
import {InMemoryCache, ApolloLink, ApolloClient, split} from 'apollo-boost';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {createUploadLink} from 'apollo-upload-client';
import '../styles/main.scss';
import Search from '../Search/Index';
import Header from '../Header/Index';
import NotFound from '../NotFound/Index';
import Main from '../Main/Index';
import Landing from '../Landing/Index';
import Details from '../Details/Index';
import Chapter from '../Chapter/Index';
import UploadForm from '../UploadForm/Index';
import User from '../User/Index';
import Login from '../Auth/Login';
import About from '../About/Index';
import {userFromToken, decodeToken} from '../Utils';
import UserContext from '../Contexts/UserContext';
import Signup from '../Auth/Signup';
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
    const user = userFromToken() || {};

    class App extends React.Component {
        setUser = token => {
            if (!token) return this.setState({user: {}});
            const decodedToken = decodeToken(token);

            if (decodedToken) {
                const user = {name: decodedToken.data, exp: decodedToken.exp};

                return this.setState({user});
            }
        };
        state = {
            user: user,
            setUser: this.setUser,
        };

        render() {
            return (
                <ApolloProvider client={client}>
                    <div>
                        <UserContext.Provider value={this.state}>
                            <div>
                                <Match path="/:title/:chapterNr/:pageNr">
                                    {props => (props.match ? '' : <Header />)}
                                </Match>
                            </div>
                            <Router>
                                <Main path="/">
                                    <Search path="/search/:param" />
                                    <Landing path="/" />
                                    <Details path="/:title" />
                                    <Chapter path="/:title/:chapterNr/:pageNr" />
                                    <UploadForm path="/upload" />
                                    <Login path="login" />
                                    <Signup path="signup" />
                                    <User path="user" />
                                    <About path="about" />
                                    <NotFound default />
                                </Main>
                            </Router>
                        </UserContext.Provider>
                    </div>
                </ApolloProvider>
            );
        }
    }

    ReactDOM.render(<App />, document.getElementById('root'));
};
setupAndRender();
