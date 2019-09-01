import React, {useState} from 'react';
import Form from './Form';
import ActionLink from '../ActionLink/Index';
import {useMutation} from '@apollo/react-hooks';
import {LOGIN_MUTATION} from '../Queries';
import UserContext from '../Contexts/UserContext';

const Login = ({navigate}) => {
    const [login, {}] = useMutation(LOGIN_MUTATION);
    const [authError, setAuthError] = useState(null);
    let logUserIn;
    const handleError = e => {
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
            {({setUser, user: {name}}) => {
                logUserIn = setUser;
                if (name) {
                    navigate('/');
                    return <div></div>;
                }
                return (
                    <div>
                        {' '}
                        <Form
                            authError={authError}
                            setAuthError={setAuthError}
                            handleFormSubmit={handleFormSubmit}
                            title={'login'}
                        />
                        <ActionLink to="/signup" text="No account? Sign up! " />
                    </div>
                );
            }}
        </UserContext.Consumer>
    );
};

export default Login;
