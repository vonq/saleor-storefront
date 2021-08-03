import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken } from "@saleor/sdk";
import { access } from "fs-extra";
import _get from "lodash/get";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useSaleorTokenSetter } from "@temp/hooks";
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
  const { isLoading } = useAuth0();
  useSaleorTokenSetter();

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
