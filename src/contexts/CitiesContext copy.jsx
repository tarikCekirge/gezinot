import { useEffect, useReducer, createContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, isLoading: true };

        case "SET_DATA": {
            return {
                ...state,
                cities: action.payload,
                isLoading: false,
            };
        }
        case "ERROR":
            return {
                ...state,
                cities: [],
                countries: [],
                isLoading: false,
            };

        default:
            return state;
    }
};

const CitiesProvider = ({ children }) => {
    const [{ cities, isLoading }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchCities = async () => {
            dispatch({ type: "LOADING" });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: "SET_DATA", payload: data });
            } catch (error) {
                console.error("Fetch error:", error);
                dispatch({ type: "ERROR" });
            }
        };

        fetchCities();
    }, []);

    const values = {
        cities,
        isLoading,
    };

    return (
        <CitiesContext.Provider value={values}>
            {children}
        </CitiesContext.Provider>
    );
};

export { CitiesProvider, CitiesContext };
