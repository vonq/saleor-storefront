import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { SaleorProvider } from "@saleor/sdk";
import { ConfigInput } from "@saleor/sdk/lib/types";
import { Integrations as ApmIntegrations } from "@sentry/apm";
import * as Sentry from "@sentry/browser";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import * as React from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import TagManager from "react-gtm-module";
import { ThemeProvider } from "styled-components";

import { NotificationTemplate } from "@components/atoms";
import { ServiceWorkerProvider } from "@components/containers";
import { defaultTheme, GlobalStyle, muiTheme } from "@styles";
import { NextQueryParamProvider } from "@temp/components";

import { version } from "../../package.json";
import { App as StorefrontApp } from "../app";
import { LocaleProvider } from "../components/Locale";
import {
  apiUrl,
  auth0ClientId,
  auth0Domain,
  channelSlug,
  sentryDsn,
  sentrySampleRate,
  serviceWorkerTimeout,
  ssrMode,
} from "../constants";

if (!ssrMode) {
  window.version = version;
}

if (process.env.GTM_ID) {
  TagManager.initialize({ gtmId: process.env.GTM_ID });
}

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    // @ts-ignore
    integrations: [new ApmIntegrations.Tracing()],
    tracesSampleRate: sentrySampleRate,
  });
}

const saleorConfig: ConfigInput = { apiUrl, channel: channelSlug };

const notificationConfig = { position: positions.BOTTOM_RIGHT, timeout: 2500 };

const onRedirectCallback = appState => {
  // Use Next.js's Router.replace method to replace the url
  Router.replace(appState?.returnTo || "/");
};

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Demo PWA Storefront – Saleor Commerce</title>
        <link rel="preconnect" href={apiUrl} />
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/favicon-36.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        cacheLocation="localstorage"
        redirectUri={
          typeof window !== "undefined" &&
          `${window.location.origin}/auth/callback`
        }
        onRedirectCallback={onRedirectCallback}
      >
        <ThemeProvider theme={defaultTheme}>
          <MuiThemeProvider theme={muiTheme}>
            <AlertProvider
              template={NotificationTemplate as any}
              {...notificationConfig}
            >
              <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
                <LocaleProvider>
                  <GlobalStyle />
                  <NextQueryParamProvider>
                    <SaleorProvider config={saleorConfig}>
                      <StorefrontApp>
                        <Component {...pageProps} />
                      </StorefrontApp>
                    </SaleorProvider>
                  </NextQueryParamProvider>
                </LocaleProvider>
              </ServiceWorkerProvider>
            </AlertProvider>
          </MuiThemeProvider>
        </ThemeProvider>
      </Auth0Provider>
    </>
  );
};

export default App;
