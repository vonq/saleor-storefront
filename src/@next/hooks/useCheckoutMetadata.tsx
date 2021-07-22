/* eslint-disable no-console */

import { useEffect, useMemo, useState } from "react";

import { CheckoutMetadataTypes } from "@app/CheckoutUtils/constants";

import { useLocalStorage } from "./useLocalStorage";

export const useCheckoutMetadata = () => {
  const {
    storedValue: checkoutData,
    setValue: setCheckoutData,
  } = useLocalStorage("data_checkout");

  const [metadata, setStoredMetadata] = useState<any>(checkoutData?.metadata);
  const [metadataErrors, setMetadataErrors] = useState<any>({});

  useEffect(() => {
    setCheckoutData({
      ...checkoutData,
      metadata,
    });
  }, [metadata]);

  const setMetadata = (value: any) => {
    setStoredMetadata(value);
  };

  const appendMetadata = (appendData: any) => {
    setMetadata({
      ...metadata,
      ...appendData,
    });
  };

  const setMetadataField = (field: any, value: any) => {
    if (!field || !value) {
      return;
    }
    appendMetadata({
      [field]: value,
    });
  };

  const metadataValues: any = useMemo(
    () => ({
      // Job Posting Details
      jobTitle: metadata && metadata[CheckoutMetadataTypes.JobTitle],
      jobDescription:
        metadata && metadata[CheckoutMetadataTypes.JobDescription],
      jobDetailLink: metadata && metadata[CheckoutMetadataTypes.VacancyURL],
      applicationLink:
        metadata && metadata[CheckoutMetadataTypes.ApplicationURL],
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
    }),
    [metadata]
  );

  return {
    metadata,
    metadataValues,
    metadataErrors,
    setMetadata,
    appendMetadata,
    setMetadataField,
    setMetadataErrors,
  };
};
