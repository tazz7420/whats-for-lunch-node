import React, { createContext, useState } from 'react';
import { changeValue } from './user.utils';

export const UserContext = createContext({
    currentUser: 'null',
    changeUser: () => { }
})

const UserProvider = ({ children }) => {
    const [currentUser, setUser] = useState('null')

    const changeUser = value => setUser(changeValue(currentUser, value));

    return (
        <UserContext.Provider
            value={{
                currentUser,
                changeUser
            }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;