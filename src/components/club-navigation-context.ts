import { createContext, useContext } from "react";

export const HomeNavigationContext = createContext(0);

export const useHomeNavigationVersion = () => useContext(HomeNavigationContext);
