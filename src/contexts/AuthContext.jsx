import { createContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage ";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
};

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "LOGOUT":
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
}

const AuthProvider = ({ children }) => {
    const [user, setUser, removeUser] = useLocalStorage("user", null);

    const [state, dispatch] = useReducer(authReducer, {
        ...initialState,
        user,
        isAuthenticated: !!user,
    });

    const FAKE_USER = {
        name: "Fake User",
        email: "fake@mail.com",
        password: "qwerty",
        avatar: "https://i.pravatar.cc/100?u=zz",
    };



    const login = (email, password) => {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            const userData = {
                name: FAKE_USER.name,
                email: FAKE_USER.email,
                avatar: FAKE_USER.avatar,
            };

            setUser(userData);
            dispatch({ type: "LOGIN", payload: userData });
            return { success: true };
        } else {
            return { success: false, message: "Invalid email or password" };
        }
    };

    const logout = () => {
        removeUser();
        dispatch({ type: "LOGOUT" });
    };

    const value = {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
