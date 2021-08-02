import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken } from "@saleor/sdk";
import { access } from "fs-extra";
import _get from "lodash/get";
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

const App: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const {
    isLoading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  useEffect(() => {
    const setTokenToSaleor = async () => {
      const organizationId = _get(user, "org_id", "");
      const accessToken = await getAccessTokenSilently({
        org_id: organizationId,
      });
      const idTokenClaims = await getIdTokenClaims();
      const idToken = _get(idTokenClaims, "__raw");
      // @TODO: figure out which token can be accepted by Saleor
      console.log("[Access Token]", accessToken);
      console.log("[User Details]", user);
      // setAuthToken(accessToken);
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
