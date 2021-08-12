import { useCart } from "@saleor/sdk";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Loader } from "@components/atoms";
import { jobAdMessages } from "@temp/intl";

const CheckoutOrder = () => {
  const { loaded: cartLoaded, items } = useCart();

  if (!cartLoaded) {
    return <Loader />;
  }

  if (!items || !items.length) {
    return (
      <div>
        <FormattedMessage {...jobAdMessages.noBasketProducts} />
      </div>
    );
  }
};

export default CheckoutOrder;
