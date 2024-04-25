import { useEffect, useMemo, useState } from "react";
import "./App.css";
import LoginPage from "./scenes/LoginPage";
import HomePage from "./scenes/HomePage";
import ProfilePage from "./scenes/ProfilePage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  // const [authorized, setAuthorized] = useState(false)
  // const token = useSelector((state) => state.token);
  
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuthenicated = Boolean(useSelector((state) => state.token));


  // this is sample trying code for Authorization
  // const tokenAuthorization = async () => {
  //   const tokenAuthResponse = await fetch(
  //     `http://localhost:8080/auth/authVerification`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   const tokenAuth = await tokenAuthResponse.json();
  //   console.log(tokenAuth);
  //   setAuthorized(tokenAuth.Authorized)
  // };

  // useEffect(() => {
  //   tokenAuthorization();
  // }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={isAuthenicated ? <HomePage /> : <LoginPage />}
          />
          <Route
            path="/login"
            element={isAuthenicated ? <HomePage /> : <LoginPage />}
          />
          <Route
            path="/profile/:userId"
            element={isAuthenicated ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
