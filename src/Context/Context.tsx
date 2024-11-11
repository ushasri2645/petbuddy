import React, { createContext, useState, ReactNode } from 'react';
interface IUser{
    name:string, 
    password:string,
    address:string,
    about:string,
    email:string,
    contact:string
    pets:any[],
}
interface UserContextType {
    user: IUser | null;
    setUser: (user: IUser) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    
    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};