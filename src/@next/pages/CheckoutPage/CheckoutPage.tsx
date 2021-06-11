import { useCart, useCheckout } from "@saleor/sdk";
import { CompleteCheckout_checkoutComplete_order } from "@saleor/sdk/lib/mutations/gqlTypes/CompleteCheckout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";

import { CheckoutMetadataTypes } from "@app/CheckoutUtils/constants";
import { Button, Loader, Redirect } from "@components/atoms";
import { CheckoutProgressBar } from "@components/molecules";
import {
  adyenNotNegativeConfirmationStatusCodes,
  CartSummary,
  // CreateJobTitleForm
  CreateJobAd,
  PaymentGatewaysList,
  SetTargetGroup,
  translateAdyenConfirmationError,
} from "@components/organisms";
import {
  apolloClient,
  createCheckoutQuery,
} from "@components/organisms/SetTargetGroup/queries";
import { Checkout } from "@components/templates";
import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";
import { paths } from "@paths";
import { ICardData, IFormError } from "@types";

import {
  CheckoutAddressSubpage,
  // CheckoutAddressSubpage,
  CheckoutPaymentSubpage,
  CheckoutReviewSubpage,
  // CheckoutShippingSubpage,
} from "./subpages";
import {
  CHECKOUT_STEPS,
  CheckoutStep,
  getAvailableSteps,
  getContinueButtonText,
  getCurrentStep,
  prepareCartSummaryProducts,
  stepSubmitSuccessHandler,
  SubpageCompleteHandler,
} from "./utils";

const CHECKOUT_GETEWAY_FORM_ID = "gateway-form";

const CheckoutPage: React.FC<NextPage> = () => {
  const { replace, push, pathname, query } = useRouter();
  const { metadata } = useCheckoutMetadata();

  const {
    loaded: cartLoaded,
    shippingPrice,
    discount,
    subtotalPrice,
    totalPrice,
    items,
  } = useCart();
  const {
    loaded: checkoutLoaded,
    checkout,
    payment,
    availablePaymentGateways,
    createPayment,
    completeCheckout,
  } = useCheckout();
  const intl = useIntl();
  const isFullyLoaded = cartLoaded && checkoutLoaded;

  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [paymentConfirmation, setPaymentConfirmation] = useState(false);

  const [campaignId] = useState("");

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<
    string | undefined
  >(payment?.gateway);
  const [
    selectedPaymentGatewayToken,
    setSelectedPaymentGatewayToken,
  ] = useState<string | undefined>(payment?.token);
  const [paymentGatewayErrors, setPaymentGatewayErrors] = useState<
    IFormError[]
  >([]);
  const checkoutGatewayFormRef = useRef<HTMLFormElement>(null);
  const pageCompleteRef = useRef<SubpageCompleteHandler>(null);
  const steps = getAvailableSteps(items);
  const { activeStepIndex, activeStep } = useMemo(() => {
    return getCurrentStep(pathname, steps, campaignId);
  }, [pathname, steps, campaignId]);
  const handleStepSubmitSuccess = stepSubmitSuccessHandler(
    push,
    steps,
    activeStepIndex
  );
  const buttonText = getContinueButtonText(activeStep.step);
  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? { gross: shippingPrice, net: shippingPrice }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };
  const pageProps = {
    ref: pageCompleteRef,
    changeSubmitProgress: setSubmitInProgress,
    onSubmitSuccess: handleStepSubmitSuccess,
  };

  const checkoutSubpage = useMemo(() => {
    const subpageMapping: Partial<Record<CheckoutStep, JSX.Element>> = {
      [CheckoutStep.SetTargetGroup]: <SetTargetGroup {...pageProps} />,
      // [CheckoutStep.Address]: <CheckoutAddressSubpage {...pageProps} />,
      [CheckoutStep.Address]: (
        <CreateJobAd
          {...pageProps}
          // setIndustry={setIndustry}
          // setTitle={setTitle}
        />
      ),
      [CheckoutStep.Shipping]: <CheckoutAddressSubpage {...pageProps} />,
      // [CheckoutStep.Shipping]: <WorkAddress {...pageProps} />,
      [CheckoutStep.Payment]: (
        <CheckoutPaymentSubpage
          {...pageProps}
          paymentGatewayFormRef={checkoutGatewayFormRef}
          onPaymentGatewayError={setPaymentGatewayErrors}
        />
      ),
      [CheckoutStep.Review]: (
        <CheckoutReviewSubpage
          {...pageProps}
          paymentGatewayFormRef={checkoutGatewayFormRef}
          selectedPaymentGatewayToken={selectedPaymentGatewayToken}
        />
      ),
    };
    return subpageMapping[activeStep.step];
  }, [activeStep.step, checkout?.id]);

  const handleProcessPayment = async (
    gateway: string,
    token?: string,
    cardData?: ICardData
  ) => {
    const paymentConfirmStepLink = CHECKOUT_STEPS.find(
      step => step.step === CheckoutStep.PaymentConfirm
    )?.link;
    const { dataError } = await createPayment({
      gateway,
      token,
      creditCard: cardData,
      returnUrl: `${window.location.origin}${paymentConfirmStepLink}`,
    });
    const errors = dataError?.error;
    setSubmitInProgress(false);
    if (errors) {
      setPaymentGatewayErrors(errors);
    } else {
      setPaymentGatewayErrors([]);
      handleStepSubmitSuccess(CheckoutStep.Payment);
    }
  };

  const handleSubmitPayment = async (paymentData?: object) => {
    const response = await completeCheckout({ paymentData });
    return {
      confirmationData: response.data?.confirmationData,
      confirmationNeeded: response.data?.confirmationNeeded,
      order: response.data?.order,
      errors: response.dataError?.error,
    };
  };

  const handleSubmitPaymentSuccess = (
    order?: CompleteCheckout_checkoutComplete_order
  ) => {
    setSubmitInProgress(false);
    setPaymentGatewayErrors([]);
    handleStepSubmitSuccess(CheckoutStep.Review, {
      id: order?.id,
      orderNumber: order?.number,
      token: order?.token,
    });
  };

  const handlePaymentGatewayError = (errors: IFormError[]) => {
    setSubmitInProgress(false);
    setPaymentGatewayErrors(errors);
    const paymentStepLink = steps.find(
      step => step.step === CheckoutStep.Payment
    )?.link;
    if (paymentStepLink) {
      push(paymentStepLink);
    }
  };

  const paymentGateways = availablePaymentGateways && (
    <PaymentGatewaysList
      paymentGateways={availablePaymentGateways}
      processPayment={handleProcessPayment}
      submitPayment={handleSubmitPayment}
      submitPaymentSuccess={handleSubmitPaymentSuccess}
      formId={CHECKOUT_GETEWAY_FORM_ID}
      formRef={checkoutGatewayFormRef}
      selectedPaymentGateway={selectedPaymentGateway}
      selectedPaymentGatewayToken={selectedPaymentGatewayToken}
      selectPaymentGateway={setSelectedPaymentGateway}
      onError={handlePaymentGatewayError}
      errors={paymentGatewayErrors}
    />
  );

  const handlePaymentConfirm = async () => {
    /**
     * Prevent proceeding in confirmation flow in case of gateways that don't support it to prevent unknown bugs.
     */
    if (payment?.gateway !== "mirumee.payments.adyen") {
      const paymentStepLink = steps.find(
        step => step.step === CheckoutStep.Payment
      )?.link;
      if (paymentStepLink) {
        push(paymentStepLink);
      }
    }

    setSubmitInProgress(true);
    setPaymentConfirmation(true);
    /**
     * Saleor API creates an order for not fully authorised payments, thus we accept all non negative payment result codes,
     * assuming the payment is completed, what means we can proceed further.
     * https://docs.adyen.com/checkout/drop-in-web?tab=http_get_1#step-6-present-payment-result
     */
    if (
      adyenNotNegativeConfirmationStatusCodes.includes(
        query.resultCode as string
      )
    ) {
      const { data, dataError } = await completeCheckout();
      const errors = dataError?.error;
      setSubmitInProgress(false);
      if (errors) {
        setPaymentGatewayErrors(errors);
        const paymentStepLink = steps.find(
          step => step.step === CheckoutStep.Payment
        )?.link;
        if (paymentStepLink) {
          push(paymentStepLink);
        }
      } else {
        setPaymentGatewayErrors([]);
        handleStepSubmitSuccess(CheckoutStep.Review, {
          id: data?.order?.id,
          orderNumber: data?.order?.number,
          token: data?.order?.token,
        });
      }
    } else {
      setPaymentGatewayErrors([
        {
          message: translateAdyenConfirmationError(
            query.resultCode as string,
            intl
          ),
        },
      ]);
      const paymentStepLink = steps.find(
        step => step.step === CheckoutStep.Payment
      )?.link;
      if (paymentStepLink) {
        push(paymentStepLink);
        setSubmitInProgress(false);
        setPaymentConfirmation(false);
      }
    }
  };

  useEffect(() => {
    if (!metadata) {
      return;
    }
    if (!metadata[CheckoutMetadataTypes.JobFunction]) {
      const { link } = CHECKOUT_STEPS[0];
      replace(link);
      return;
    }
    if (!metadata[CheckoutMetadataTypes.JobTitle]) {
      const { link } = CHECKOUT_STEPS[1];
      replace(link);
    }
  }, [metadata, pathname]);

  // useRedirectToCorrectCheckoutStep(cartLoaded);
  useEffect(() => setSelectedPaymentGateway(payment?.gateway), [
    payment?.gateway,
  ]);
  useEffect(() => setSelectedPaymentGatewayToken(payment?.token), [
    payment?.token,
  ]);

  useEffect(() => {
    const paymentConfirmStepLink = CHECKOUT_STEPS.find(
      step => step.step === CheckoutStep.PaymentConfirm
    )?.link;
    if (
      !submitInProgress &&
      checkout &&
      pathname === paymentConfirmStepLink &&
      !paymentConfirmation
    ) {
      handlePaymentConfirm();
    }
  }, [pathname, query, submitInProgress, checkout]);
  // console.log(activeStep.step);

  useEffect(() => {
    const createCheckout = async () => {
      try {
        const response = await apolloClient.mutate({
          mutation: createCheckoutQuery,
          variables: {
            lines: (items || []).map(item => ({
              quantity: item.quantity,
              variantId: item.variant.id,
            })),
          },
        });
        const newCheckout = response?.data?.checkoutCreate?.checkout;
        localStorage.setItem(
          "data_checkout",
          JSON.stringify({
            ...newCheckout,
            lines: items,
            metadata: {},
          })
        );
        history.go(0);
      } catch (error) {
        console.log("Error on creating checkout", error); // eslint-disable-line no-console
      }
    };
    if (!checkout?.id && !!items) {
      createCheckout();
    }
  }, [checkout, items]);

  if (cartLoaded && !items?.length) {
    return <Redirect url={paths.cart} />;
  }

  if (checkoutLoaded && !checkout?.id) {
    return <Loader />;
  }

  return (
    <Checkout
      loading={submitInProgress}
      navigation={
        isFullyLoaded && (
          <CheckoutProgressBar steps={steps} activeStep={activeStepIndex} />
        )
      }
      cartSummary={
        <CartSummary
          shipping={shippingTaxedPrice}
          subtotal={subtotalPrice}
          promoCode={promoTaxedPrice}
          total={totalPrice}
          products={prepareCartSummaryProducts(items)}
        />
      }
      checkout={isFullyLoaded ? checkoutSubpage : <Loader />}
      paymentGateways={paymentGateways}
      hidePaymentGateways={steps[activeStepIndex].step !== CheckoutStep.Payment}
      button={
        cartLoaded &&
        buttonText && (
          <Button
            testingContext="checkoutPageNextStepButton"
            onClick={() => pageCompleteRef.current?.()}
            type="submit"
            disabled={!isFullyLoaded || submitInProgress}
          >
            {buttonText}
          </Button>
        )
      }
    />
  );
};

export { CheckoutPage };
