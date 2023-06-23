import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const getLoggedIn = async () => {
    try {
      const loggedInRes = await axios.get("http://localhost:3001/api/users/loggedIn");
      const userRoleRes = await axios.get("http://localhost:3001/api/users/getName");
      const userData = userRoleRes.data;
  
      setLoggedIn(loggedInRes.data);
  
      if (userData.role === "admin") {
        setIsAdmin(true);
        if (!loggedInRes.data) {
          navigate("/"); // Redirect to the home page for admins only when not already logged in
        }
      } else {
        setIsAdmin(false);
        if (!loggedInRes.data) {
          navigate("/"); // Redirect to the home page for non-admins only when not already logged in
        }
      }
  
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    getLoggedIn();
  },);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ loggedIn, getLoggedIn, isAdmin }}>
      {props.children}
    </UserContext.Provider>
  );
}
// export default UserContext;
export { UserContextProvider, UserContext };
