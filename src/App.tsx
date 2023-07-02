import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Header from "./Components/header/header.component";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme(
    {
      palette: {
        mode: paletteType
      }
    }
  )

  const onChangeTheme = () => {
    setDarkMode(!darkMode);
  }

  return (
    <>

      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
        <CssBaseline />
        <Header dark={darkMode} onChange={onChangeTheme} />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
