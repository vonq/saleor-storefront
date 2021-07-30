import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken } from "@saleor/sdk";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { Loader } from "@components/atoms";
import { demoMode } from "@temp/constants";

import {
  Footer,
  MainMenu,
  MetaConsumer,
  OverlayManager,
  OverlayProvider,
} from "../components";
import ShopProvider from "../components/ShopProvider";
import Notifications from "./Notifications";

import "../globalStyles/scss/index.scss";
import { access } from 'fs-extra';

const App: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const setTokenToSaleor = async () => {
      const accessToken = await getAccessTokenSilently();
      setAuthToken(accessToken);
    };

    if (isAuthenticated) {
      setTokenToSaleor();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ShopProvider>
      <OverlayProvider pathname={pathname}>
        <MetaConsumer />
        <MainMenu demoMode={demoMode} />
        {children}
        <Footer />
        <OverlayManager />
        <Notifications />
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
