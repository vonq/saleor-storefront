import { createContext } from "react";

// import { IServiceWorkerContext } from "./types";

export interface IServiceWorkerContext {
  // updateAvailable: boolean;
  workLocationData: any;
  setWorkLocationData: (arg: any) => void;
  setIsNewLocation: (arg: any) => void;
  isNewLocation: any;
  companies: any;
  setCompanies: (arg: any) => void;
}

export const WorkAddressContext = createContext<IServiceWorkerContext>({
  workLocationData: {},
  setWorkLocationData: () => {},
  setIsNewLocation: () => {},
  isNewLocation: {},
  companies: {},
  setCompanies: () => {},
});