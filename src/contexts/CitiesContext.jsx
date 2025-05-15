import { useEffect, useReducer, useCallback, useMemo, createContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
};

function reducer(state, action) {
    switch (action.type) {
        case "LOADING":
            return { ...state, isLoading: true, currentCity: {} };

        case "SET_DATA":
            return { ...state, cities: action.payload, isLoading: false };

        case "GET_CITY":
            return { ...state, currentCity: action.payload, isLoading: false };

        case "ADD_CITY":
            return { ...state, cities: [...state.cities, action.payload], currentCity: action.payload, isLoading: false };


        case "ERROR":
            return { ...state, cities: [], currentCity: {}, isLoading: false };

        default:
            return state;
    }
}

function CitiesProvider({ children }) {
    const [{ cities, currentCity, isLoading }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        (async () => {
            dispatch({ type: "LOADING" });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: "SET_DATA", payload: data });
            } catch (err) {
                console.error(err);

            }
        })();
    }, []);

    const getCity = useCallback(async (id) => {
        dispatch({ type: "LOADING" });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            if (!res.ok) throw new Error(`City with ID ${id} not found`);

            const data = await res.json();
            dispatch({ type: "GET_CITY", payload: data });
        } catch (err) {
            console.error(err);

        }
    }, []);


    const createCity = useCallback(async (newCity) => {
        dispatch({ type: "LOADING" });
        try {
            const res = await fetch(`${BASE_URL}/cities/`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': "application/json"
                }
            });
            const data = await res.json();
            dispatch({ type: "ADD_CITY", payload: data });
        } catch (err) {
            console.error(err);
        }
    }, []);

    const value = useMemo(
        () => ({ cities, isLoading, currentCity, getCity, createCity }),
        [cities, isLoading, currentCity, getCity, createCity]
    );

    return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
}


export { CitiesProvider, CitiesContext };
