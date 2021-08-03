import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken } from "@saleor/sdk";
import _get from "lodash/get";
import React, { useEffect } from "react";

// Once Auth0 authentication succeeds, copy token to Saleor SDK
export default function useSaleorTokenSetter() {
  const {
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
      console.log("[Access Token]", accessToken);
      console.log("[ID Token]", idToken);
      console.log("[User Details]", user);
      setAuthToken(idToken);
    };

    if (isAuthenticated) {
      setTokenToSaleor();
    }
  }, [isAuthenticated]);
}
