import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const CityList = lazy(() => import("./components/CityList"));
const CountryList = lazy(() => import("./components/CountryList"));
const City = lazy(() => import("./components/City"));
const Form = lazy(() => import("./components/Form"));
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
