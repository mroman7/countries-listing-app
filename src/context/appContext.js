import { createContext, useContext, useEffect, useState } from "react";
import countriesData from "./data.json";

// Creating Global Context State
const AppContext = createContext();

export const AppCtx = () => useContext(AppContext);

// Serving Context 
const AppContextProvider = ({ children }) => {

    const [countries, setCountries] = useState(countriesData);
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    // setting theme color mode
    const setTheme = (type) => {
        setIsDarkTheme(type);
        localStorage.setItem("themeMode", type);
    };



    useEffect(() => {
        if (typeof window != undefined) {
            let themeMode = JSON.parse(localStorage.getItem("themeMode"));
            console.log("Theme mode ===>> ", themeMode);
            if (themeMode != undefined) {
                setIsDarkTheme(themeMode);
                if (themeMode) {
                    document.body.classList.add("dark");
                } else {
                    document.body.classList.remove("dark");
                }
            } else {
                localStorage.setItem("themeMode", isDarkTheme);
                if (isDarkTheme) {
                    document.body.classList.add("dark");
                } else {
                    document.body.classList.remove("dark");
                }
            }
        }
    }, [isDarkTheme]);

    return (
        <AppContext.Provider
            value={{
                countries,
                setCountries,
                setTheme,
                isDarkTheme
            }}
        >
            {children}
        </AppContext.Provider>
    )

}
export default AppContextProvider;