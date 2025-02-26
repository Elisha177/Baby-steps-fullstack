/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React,{createContext,useState} from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme,setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark": "light");
    }
    return(
        <ThemeContext.Provider value = {{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
