import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken, useAuth } from "@saleor/sdk";
import _get from "lodash/get";
import * as React from "react";

// Once Auth0 authentication succeeds, copy token to Saleor SDK
export default function useSaleorTokenSetter() {
  const {
    isAuthenticated,
    user,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();
  const { authenticated, externalSignIn } = useAuth();

  React.useEffect(() => {
    const setTokenToSaleor = async () => {
      const organizationId = _get(user, "org_id", "");
      const accessToken = await getAccessTokenSilently({
        org_id: organizationId,
      });
      const idTokenClaims = await getIdTokenClaims();
      const idToken = _get(idTokenClaims, "__raw");
      /* eslint-disable no-console */
      console.log("[Auth0] access token:", accessToken);
      console.log("[Auth0] id token:", idToken);
      console.log("[Auth0] user:", user);
      /* eslint-enable no-console */
      setAuthToken(idToken);
      if (!authenticated) {
        externalSignIn();
      }
    };

    if (isAuthenticated) {
      setTokenToSaleor();
    }
  }, [isAuthenticated]);
}
