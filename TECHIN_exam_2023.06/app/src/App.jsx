import { Route, Routes } from "react-router-dom";
import { UserContextProvider, UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";

import "./App.css";

import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import CategoryAdministrationPage from "./pages/CategoryAdministrationPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import CreateServicePage from "./pages/CreateServicePage";
import EditService from "./pages/EditServicePage";
import EditCategory from "./pages/EditCategoryPage";

import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  const { loggedIn,  getLoggedIn } = useContext(UserContext);

  useEffect(() => {
    getLoggedIn();
  });

  if (loggedIn === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={loggedIn ? <Layout /> : <LoginPage />}>
        <>
          <Route index element={<IndexPage />} />
          <>
            <Route
              path="/CategoryAdministrationPage"
              element={<CategoryAdministrationPage />}
            />
            <Route path="/CreateCategoryPage" element={<CreateCategoryPage />} />
            <Route path="/CreateServicePage" element={<CreateServicePage />} />
            <Route path="/EditServicePage/:id" element={<EditService />} />
            <Route path="/EditCategoryPage/:id" element={<EditCategory />} />
          </>
        </>
      </Route>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );
}
