import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import { useRouter } from "next/router";
import React from "react";

import { Loader } from "@components/atoms";
import {
  apolloClient,
  createCheckoutQuery,
} from "@components/organisms/SetTargetGroup/queries";
import { paths } from "@paths";

const CheckoutPage = () => {
  const { replace } = useRouter();
  const { user } = useAuth();
  const { loaded: cartLoaded, items } = useCart();
  const { loaded: checkoutLoaded, checkout } = useCheckout();

  if (!cartLoaded || !checkoutLoaded) {
    return <Loader />;
  }

  if (!items || !items.length) {
    replace("/cart");
    return null;
  }

  const createCheckout = async () => {
    try {
      const email = user?.email || "customer@example.com";
      const response = await apolloClient.mutate({
        mutation: createCheckoutQuery,
        variables: {
          lines: (items || []).map(item => ({
            quantity: item.quantity,
            variantId: item.variant.id,
          })),
          email,
        },
      });
      const newCheckoutToken = response?.data?.checkoutCreate?.checkout?.token;
      replace(`${paths.checkoutCreateJobAd}/?id=${newCheckoutToken}`);
    } catch (error) {
      console.log("Error on creating checkout", error); // eslint-disable-line no-console
    }
  };

  if (!checkout?.token) {
    createCheckout();
  } else {
    replace(`${paths.checkoutCreateJobAd}/?id=${checkout.token}`);
  }
  return <Loader />;
};

export { CheckoutPage };
