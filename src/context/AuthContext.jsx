import { createContext, useContext, useState, useEffect } from 'react';
import {
    register,
    login,
    getCurrentUser,
    logout,
} from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setAuthChecked(true);
                setLoading(false);
                return;
            }

            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setAuthChecked(true);
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const signUp = async (email, password) => {
        setLoading(true);
        try {
            const { token } = await register(email, password);
            localStorage.setItem('token', token);
            const userData = await getCurrentUser();
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const { token } = await login(email, password);
            localStorage.setItem('token', token);
            const userData = await getCurrentUser();
            setUser(userData);
            return userData;
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            await logout();
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                authChecked,
                register: signUp,
                login: signIn,
                logout: signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
