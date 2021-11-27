import React, { createContext, useState } from 'react';
import { changeValue } from './user.utils';

export const UserContext = createContext({
    currentUser: 'null',
    currentUserId: 'null',
    changeUser: () => { }
})

const UserProvider = ({ children }) => {
    const [currentUser, setUser] = useState('null');
    const [currentUserId, setUserId] = useState('null');

    const changeUser = value => setUser(changeValue(currentUser, value));
    const changeUserId = value => setUserId(changeValue(currentUserId, value));

    return (
        <UserContext.Provider
            value={{
                currentUser,
                changeUser,
                currentUserId,
                changeUserId
            }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;