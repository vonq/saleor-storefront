import { useCart } from "@saleor/sdk";
import React from "react";

import { Loader } from "@components/atoms";

const CheckoutOrder = () => {
  const { loaded: cartLoaded, items } = useCart();

  if (!cartLoaded) {
    return <Loader />;
  }

  if (!items || !items.length) {
    return <div>No products in the basket</div>;
  }
};

export default CheckoutOrder;
