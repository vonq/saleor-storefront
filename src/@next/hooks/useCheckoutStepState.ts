import { IItems, ITotalPrice } from "@saleor/sdk/lib/api/Cart/types";
import { ICheckout, IPayment } from "@saleor/sdk/lib/api/Checkout/types";
import { useEffect, useState } from "react";

import { CheckoutMetadataTypes } from "@app/CheckoutUtils/constants";
import {
  checkIfShippingRequiredForProducts,
  CheckoutStep,
} from "@pages/CheckoutPage/utils";
import { isPriceEqual } from "@utils/money";

interface StepState {
  recommendedStep: CheckoutStep;
  maxPossibleStep: CheckoutStep;
}

export const useCheckoutStepState = (
  items?: IItems,
  checkout?: ICheckout,
  payment?: IPayment,
  totalPrice?: ITotalPrice,
  metadata?: any
): StepState => {
  const isShippingRequiredForProducts = checkIfShippingRequiredForProducts(
    items
  );
  const isCheckoutPriceEqualPaymentPrice =
    payment?.total &&
    totalPrice?.gross &&
    isPriceEqual(payment.total, totalPrice.gross);

  const getMaxPossibleStep = () => {
    const isJobFunctionSet =
      metadata && metadata[CheckoutMetadataTypes.JobFunction];
    if ((!checkout?.id && items) || !isJobFunctionSet) {
      // we are creating checkout during address set up
      return CheckoutStep.SetTargetGroup;
    }

    const isShippingAddressSet =
      !isShippingRequiredForProducts || !!checkout?.shippingAddress;
    const isBillingAddressSet = !!checkout?.billingAddress;
    const isShippingMethodSet =
      !isShippingRequiredForProducts || !!checkout?.shippingMethod;
    const isPaymentMethodSet =
      !!payment?.id && isCheckoutPriceEqualPaymentPrice;

    if (isShippingRequiredForProducts) {
      if (!isShippingAddressSet || !isBillingAddressSet) {
        return CheckoutStep.Shipping;
      }
    }
    if (!isShippingMethodSet) {
      return CheckoutStep.Payment;
    }
    if (!isPaymentMethodSet) {
      return CheckoutStep.Payment;
    }
    return CheckoutStep.Review;
  };

  const getRecommendedStep = (newMaxPossibleStep: CheckoutStep) => {
    const isPaymentRecreateRequired =
      newMaxPossibleStep > CheckoutStep.Shipping &&
      !isCheckoutPriceEqualPaymentPrice;

    if (isPaymentRecreateRequired && isShippingRequiredForProducts) {
      return CheckoutStep.Shipping;
    }
    if (isPaymentRecreateRequired) {
      return CheckoutStep.Payment;
    }
    return newMaxPossibleStep;
  };

  const [maxPossibleStep, setMaxPossibleStep] = useState(getMaxPossibleStep());
  const [recommendedStep, setRecommendedStep] = useState(
    getRecommendedStep(maxPossibleStep)
  );

  useEffect(() => {
    const newMaxPossibleStep = getMaxPossibleStep();
    const newRecommendedStep = getRecommendedStep(newMaxPossibleStep);
    if (maxPossibleStep !== newMaxPossibleStep) {
      setMaxPossibleStep(newMaxPossibleStep);
    }
    if (recommendedStep !== newRecommendedStep) {
      setRecommendedStep(newRecommendedStep);
    }
  }, [checkout, items, payment, totalPrice, metadata]);

  return { recommendedStep, maxPossibleStep };
};
