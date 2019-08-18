import React, {useState} from 'react';
import Form from './Form';
import {useMutation} from '@apollo/react-hooks';
import {SIGNUP_MUTATION} from '../Queries';
import UserContext from '../Contexts/UserContext';

const Signup = ({navigate}) => {
    const [signup, {}] = useMutation(SIGNUP_MUTATION);
    const [authError, setAuthError] = useState(null);
    let logUserIn;
    const handleError = e => {
        console.log(JSON.stringify(e));
        setAuthError(e.graphQLErrors[0].message);
    };
    const handleAuth = ({data: {registerUser}}) => {
        localStorage.setItem('userToken', registerUser);
        logUserIn(registerUser);
        navigate('/');
    };

    const handleFormSubmit = values => {
        signup({variables: values})
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
                    <Form
                        authError={authError}
                        setAuthError={setAuthError}
                        handleFormSubmit={handleFormSubmit}
                        title={'sign up'}
                    />
                );
            }}
        </UserContext.Consumer>
    );
};

export default Signup;
