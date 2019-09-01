import React from 'react';
import ReactDOM from 'react-dom';
import {Match} from '@reach/router';
import {ApolloProvider} from 'react-apollo';
import {persistCache} from 'apollo-cache-persist';
import {InMemoryCache, ApolloClient} from 'apollo-boost';

import {createUploadLink} from 'apollo-upload-client';
import '../styles/main.scss';
import Header from '../Header/Index';
import {userFromToken, decodeToken} from '../Utils';
import UserContext from '../Contexts/UserContext';
import AppRouter from '../AppRouter';
const httpLink = createUploadLink({
    uri: 'http://gutenbergs.xyz/graphql',
});

const cache = new InMemoryCache();

const setupAndRender = async () => {
    await persistCache({
        cache,
        storage: localStorage,
    });

    if (localStorage['apollo-cache-persist']) {
        let cacheData = JSON.parse(localStorage['apollo-cache-persist']);
        cache.restore(cacheData);
    }

    const client = new ApolloClient({cache, link: httpLink});

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
                        </UserContext.Provider>
                        <AppRouter />
                    </div>
                </ApolloProvider>
            );
        }
    }

    ReactDOM.render(<App />, document.getElementById('root'));
};
setupAndRender();
