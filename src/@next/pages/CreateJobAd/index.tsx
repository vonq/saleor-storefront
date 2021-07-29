import { useCart, useCheckout } from "@saleor/sdk";
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
import { apolloClient } from "@components/organisms/SetTargetGroup/queries";
import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";
import CreateJobAdContent from "@pages/CreateJobAd/CreateJobAdContent";
import { JobCategory } from "@pages/CreateJobAd/JobPostingDetailsForm";
import { getCheckoutQuery } from "@pages/CreateJobAd/queries";

import { fetchJobFunctionList } from "./utils";

const CreateJobAd = () => {
  const { replace, query } = useRouter();
  const token = query?.id;

  const { loaded: cartLoaded, items } = useCart();
  const { loaded: checkoutLoaded, checkout } = useCheckout();

  const [jobFunctionList, setJobFunctionList] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [metadataErrors, setMetadataErrors] = useState<any>([]);
  const { metadata, appendMetadata } = useCheckoutMetadata();

  const parseMetadata = (data: any) => ({
    // Job Posting Details
    jobTitle: data && data[CheckoutMetadataTypes.JobTitle],
    jobDescription: data && data[CheckoutMetadataTypes.JobDescription],
    jobDetailLink: data && data[CheckoutMetadataTypes.VacancyURL],
    applicationLink: data && data[CheckoutMetadataTypes.ApplicationURL],
    jobExperience: data && data[CheckoutMetadataTypes.MinExp],
    jobFunction: data && data[CheckoutMetadataTypes.JobFunction],
    industry: data && data[CheckoutMetadataTypes.Industry],
    // Job Criteria
    employmentType: data && data[CheckoutMetadataTypes.VacancyType],
    minHours: data && data[CheckoutMetadataTypes.MinWorkingHours],
    maxHours: data && data[CheckoutMetadataTypes.MaxWorkingHours],
    minSalary: data && data[CheckoutMetadataTypes.SalaryMinAmount],
    maxSalary: data && data[CheckoutMetadataTypes.SalaryMaxAmount],
    currency: data && data[CheckoutMetadataTypes.SalaryCurrency],
    period: data && data[CheckoutMetadataTypes.SalaryPerPeriod],
    contactName: data && data[CheckoutMetadataTypes.ContactName],
    contactPhone: data && data[CheckoutMetadataTypes.ContactNumber],
    seniority: data && data[CheckoutMetadataTypes.Seniority],
    education: data && data[CheckoutMetadataTypes.EducationLevel],
  });

  const parsed = parseMetadata(metadata);

  const [metadataValues, setMetadataValues] = useState<any>(parsed);

  useEffect(() => {
    const generateCheckoutDetails = async () => {
      const { data } = await apolloClient.query({
        query: getCheckoutQuery,
        variables: {
          token,
        },
      });
      if (data?.checkout?.token === token) {
        const newCheckout = data?.checkout;
        const newData =
          newCheckout?.metadata.map(({ key, value }: MetadataInput) => ({
            [key]: value,
          })) || [];
        const newMetadata = {};
        Object.assign(newMetadata, ...newData);
        localStorage.setItem(
          "data_checkout",
          JSON.stringify({
            ...newCheckout,
            lines: items,
            metadata: newMetadata,
          })
        );
        const parsed = parseMetadata(newMetadata);
        setMetadataValues(parsed);
      }
    };
    if (cartLoaded) {
      generateCheckoutDetails();
    }
  }, [token, cartLoaded]);

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
