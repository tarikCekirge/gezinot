import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Pricing from "./pages/Pricing"
import Product from "./pages/Product"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import { useReducer } from "react"
import { useEffect } from "react"
import CountryList from "./components/CountryList"
import City from "./components/City"


const BASE_URL = "http://localhost:8000"

const initialState = {
  countries: [],
  cities: [],
  isLoading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "SET_DATA": {
      const uniqueCountriesMap = new Map();
      for (const item of action.payload) {
        if (!uniqueCountriesMap.has(item.country)) {
          uniqueCountriesMap.set(item.country, {
            id: item.id,
            country: item.country,
            emoji: item.emoji
          });
        }
      }
      const uniqueCountries = Array.from(uniqueCountriesMap.values()).sort((a, b) =>
        a.country.localeCompare(b.country)
      );
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
        countries: uniqueCountries
      };
    }

    default:
      break;
  }
}
const App = () => {

  const [{ cities, isLoading, countries }, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'LOADING' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'SET_DATA', payload: data });
        // const citiesObj = data.reduce((acc, city) => {
        //   acc[city.id] = city;
        //   return acc;
        // }, {});
        // dispatch({ type: 'SET_DATA', payload: citiesObj });
      } catch (error) {
        console.error('Fetch error:', error);
        dispatch({ type: 'SET_DATA', payload: [] });
      }
    };

    fetchCities();
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />} >
          <Route index element={<p>LIST</p>} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList countries={countries} isLoading={isLoading} />} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App