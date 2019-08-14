import React from 'react';
import Subtitle from '../Subtitle/Subtitle';
import UserContext from '../Contexts/UserContext';
const User = () => (
    <div>
        <UserContext.Consumer>
            {data => {
                console.log(data);
                return (
                    <div>
                        <Subtitle text="read books" />
                    </div>
                );
            }}
        </UserContext.Consumer>
    </div>
);

export default User;
