import { createContext, useReducer } from "react";
import React from "react";

export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const themeReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_MODE":
        return { ...state, mode: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(themeReducer, {
    mode:'dark',
  });
  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
