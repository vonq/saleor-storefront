import { useAuth0 } from "@auth0/auth0-react";
import { NextPage } from "next";
import React, { useEffect } from "react";

import { Loader } from "@components/atoms";

const LoginView: React.FC<NextPage> = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const organization = params.get("organization");
    const invitation = params.get("invitation");

    if (organization && invitation) {
      loginWithRedirect({
        organization,
        invitation,
      });
    }
  }, []);

  return <Loader fullScreen />;
};

export default LoginView;
