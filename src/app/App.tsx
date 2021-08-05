import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken } from "@saleor/sdk";
import { access } from "fs-extra";
import _get from "lodash/get";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useSaleorTokenSetter } from "@temp/hooks";
import { Loader } from "@components/atoms";
import { useDynamicRouteRedirect } from "@hooks";
import { demoMode } from "@temp/constants";
import { ShopConfig } from "@utils/ssr";

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

type AppProps = ShopConfig;

const App: React.FC<AppProps> = ({
  footer,
  mainMenu,
  shopConfig,
  children,
}) => {
  const { pathname } = useRouter();
  // const willRedirect = useDynamicRouteRedirect();
  // const { tokenRefreshing, tokenVerifying } = useAuth();
  // const loading = tokenRefreshing || tokenVerifying || willRedirect;

  const { isLoading: loading } = useAuth0();
  useSaleorTokenSetter();

  return (
    <ShopProvider shopConfig={shopConfig}>
      <OverlayProvider pathname={pathname}>
        <MetaConsumer />
        <MainMenu loading={loading} demoMode={demoMode} menu={mainMenu} />
        {loading ? <Loader fullScreen /> : children}
        <Footer menu={footer} />
        <OverlayManager />
        <Notifications />
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
