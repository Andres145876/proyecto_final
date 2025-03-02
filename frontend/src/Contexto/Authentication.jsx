import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);

useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    const decoded = jwt.decode(token);
    setUser(decoded);
    }
}, []);

const login = (data) => {
    setUser(data);
};

const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
};

return (
    <AuthContext.Provider value={{ user, login, logout }}>
    {children}
    </AuthContext.Provider>
);
};
