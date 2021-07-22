import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Loader } from "@components/atoms";
import {
  apolloClient,
  createCheckoutQuery,
} from "@components/organisms/SetTargetGroup/queries";
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
