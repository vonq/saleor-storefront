import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {
  CheckoutMetadataTypes,
  CheckoutValueTypes,
} from "@app/CheckoutUtils/constants";
import {
  MetadataError,
  updateMetadataQuery,
} from "@app/CheckoutUtils/updateMetadata";
import { Loader } from "@components/atoms";
import {
  apolloClient,
  createCheckoutQuery,
} from "@components/organisms/SetTargetGroup/queries";
import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";
import CreateJobAdContent from "@pages/CreateJobAd/CreateJobAdContent";
import { JobCategory } from "@pages/CreateJobAd/JobPostingDetailsForm";
import { fetchJobFunctionList } from "@pages/CreateJobAd/utils";

const CreateJobAd = () => {
  const { replace } = useRouter();
  const { user } = useAuth();
  const { loaded: cartLoaded, items } = useCart();
  const {
    loaded: checkoutLoaded,
    checkout,
    // payment,
    // availablePaymentGateways,
    // createPayment,
    // completeCheckout,
  } = useCheckout();

  const [jobFunctionList, setJobFunctionList] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { metadataValues, setMetadataErrors } = useCheckoutMetadata();

  useEffect(() => {
    const fetchJobList = async () => {
      setLoading(true);
      const jobList = await fetchJobFunctionList();
      setJobFunctionList(jobList);
      setLoading(false);
    };
    if (!jobFunctionList || !jobFunctionList.length) {
      fetchJobList();
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!checkout?.id) {
        return;
      }
      const metadata = Object.keys(metadataValues)
        .filter(key => !!metadataValues[key])
        .map(key => ({
          key: CheckoutMetadataTypes[CheckoutValueTypes[key]],
          value: metadataValues[key],
        }));
      const res = await apolloClient.mutate({
        mutation: updateMetadataQuery,
        variables: {
          id: checkout?.id || "",
          metadata,
        },
      });
      const errors = res?.data?.updateMetadata?.metadataErrors;
      if (errors && errors.length) {
        const newErrors: any = {};
        errors.forEach((error: { field: string; message: string }) => {
          newErrors[error.field] = error.message;
        });
        setMetadataErrors(newErrors);
      } else {
        setMetadataErrors({});
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [checkout?.id]);

  if (!cartLoaded || !checkoutLoaded || loading) {
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

  if (!checkout?.id) {
    createCheckout();
    return null;
  }

  return <CreateJobAdContent jobFunctionList={jobFunctionList} />;
};

export default CreateJobAd;
