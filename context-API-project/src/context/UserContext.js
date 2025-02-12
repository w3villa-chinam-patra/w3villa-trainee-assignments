import { createContext, useContext } from "react";

const userContext = createContext();

export const UserProvider = userContext.Provider;

export const useUser = () => useContext(userContext);   