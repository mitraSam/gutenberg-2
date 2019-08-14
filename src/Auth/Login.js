import React, {useState, Component} from 'react';
import Form from './Form';
import {useMutation} from '@apollo/react-hooks';
import {LOGIN_MUTATION} from '../Queries';
import UserContext from '../Contexts/UserContext';

const Login = ({navigate}) => {
    const [login, {}] = useMutation(LOGIN_MUTATION);
    const [authError, setAuthError] = useState(null);
    let logUserIn;
    const handleError = e => {
        console.log(e);
        setAuthError(e.graphQLErrors[0].message);
    };
    const handleAuth = ({data: {loginUser}}) => {
        localStorage.setItem('userToken', loginUser);
        logUserIn(loginUser);
        navigate('/');
    };

    const handleFormSubmit = values => {
        login({variables: values})
            .then(handleAuth)
            .catch(handleError);
    };

    return (
        <UserContext.Consumer>
            {({setUser}) => {
                logUserIn = setUser;
                return (
                    <Form
                        authError={authError}
                        setAuthError={setAuthError}
                        handleFormSubmit={handleFormSubmit}
                        title={'login'}
                    />
                );
            }}
        </UserContext.Consumer>
    );
};

export default Login;
