import { createContext } from "@builder.io/qwik";
import { SiteStore, Web3authStore } from "./types";

export const GlobalStoreContext = createContext<SiteStore>("site-store");
export const Web3AuthStoreContext =
  createContext<Web3authStore>("web3auth-store");
