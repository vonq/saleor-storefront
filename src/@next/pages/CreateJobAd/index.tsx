import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

import {
  CheckoutMetadataTypes,
  CheckoutValueTypes,
} from "@app/CheckoutUtils/constants";
import {
  MetadataInput,
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
  const [metadataErrors, setMetadataErrors] = useState<any>([]);
  const { metadata, appendMetadata } = useCheckoutMetadata();

  const [metadataValues, setMetadataValues] = useState<any>({
    // Job Posting Details
    jobTitle: metadata && metadata[CheckoutMetadataTypes.JobTitle],
    jobDescription: metadata && metadata[CheckoutMetadataTypes.JobDescription],
    jobDetailLink: metadata && metadata[CheckoutMetadataTypes.VacancyURL],
    applicationLink: metadata && metadata[CheckoutMetadataTypes.ApplicationURL],
    jobExperience: metadata && metadata[CheckoutMetadataTypes.MinExp],
    jobFunction: metadata && metadata[CheckoutMetadataTypes.JobFunction],
    industry: metadata && metadata[CheckoutMetadataTypes.Industry],
    // Job Criteria
    employmentType: metadata && metadata[CheckoutMetadataTypes.VacancyType],
    minHours: metadata && metadata[CheckoutMetadataTypes.MinWorkingHours],
    maxHours: metadata && metadata[CheckoutMetadataTypes.MaxWorkingHours],
    minSalary: metadata && metadata[CheckoutMetadataTypes.SalaryMinAmount],
    maxSalary: metadata && metadata[CheckoutMetadataTypes.SalaryMaxAmount],
    currency: metadata && metadata[CheckoutMetadataTypes.SalaryCurrency],
    period: metadata && metadata[CheckoutMetadataTypes.SalaryPerPeriod],
    contactName: metadata && metadata[CheckoutMetadataTypes.ContactName],
    contactPhone: metadata && metadata[CheckoutMetadataTypes.ContactNumber],
    seniority: metadata && metadata[CheckoutMetadataTypes.Seniority],
    education: metadata && metadata[CheckoutMetadataTypes.EducationLevel],
  });

  const setMetaFieldData = (field: any, value: any) => {
    setMetadataValues((values: any) => ({
      ...values,
      [field]: value,
    }));
  };

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
      const { data } = await apolloClient.mutate({
        mutation: updateMetadataQuery,
        variables: {
          id: checkout?.id || "",
          metadata,
        },
      });
      const updateMetadata = data?.updateMetadata;
      const errors = updateMetadata?.metadataErrors || [];
      setMetadataErrors(errors);

      if (errors?.length) {
        return;
      }

      const newData =
        updateMetadata?.item?.metadata.map(({ key, value }: MetadataInput) => ({
          [key]: value,
        })) || [];
      const newMetadata = {};
      Object.assign(newMetadata, ...newData);
      appendMetadata(newMetadata);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [checkout?.id, metadataValues]);

  const metaErrors: any = useMemo(() => {
    if (!metadataErrors || !metadataErrors.length) {
      return {};
    }
    const newErrors: any = {};
    metadataErrors.forEach((error: { field: string; message: string }) => {
      newErrors[error.field] = error.message;
    });
    return newErrors;
  }, [metadataErrors]);

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

  return (
    <CreateJobAdContent
      setMetaFieldData={setMetaFieldData}
      metadataValues={metadataValues}
      jobFunctionList={jobFunctionList}
      metaErrors={metaErrors}
    />
  );
};

export default CreateJobAd;
