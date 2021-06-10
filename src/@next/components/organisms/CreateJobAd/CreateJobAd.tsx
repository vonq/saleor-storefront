/* eslint-disable no-console */
import { useCheckout } from "@saleor/sdk";
import { Formik } from "formik";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { CheckoutMetadataTypes } from "@app/CheckoutUtils/constants";
import { findOptionByField } from "@app/CheckoutUtils/helpers";
import {
  MetadataInput,
  TypedMetadataUpdateMutation,
} from "@app/CheckoutUtils/updateMetadata";
import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";

import {
  CheckoutStep,
  currencies,
  employmentTypes,
  periods,
} from "./constants";
import { CreateJobContent } from "./CreateJobContent";
import * as S from "./styles";

export interface ICreateJobAdProps {
  changeSubmitProgress: any;
  onSubmitSuccess: any;
  setTitle?: any;
}

interface FormValues {
  jobTitle: string;
  jobDescription: string;
  jobDetailLink: string;
  applicationLink: string;
  jobExperience: string;
  employmentType: any;
  minHours: string;
  maxHours: string;
  minSalary: string;
  maxSalary: string;
  currency: any;
  period: any;
  contactName: string;
  contactPhone: string;
}

export const CreateJobAd: React.FC<ICreateJobAdProps> = forwardRef(
  (
    {
      changeSubmitProgress,
      onSubmitSuccess,
      // setIndustry,
      // setTitle,
    },
    ref
  ) => {
    const { checkout } = useCheckout();
    const { metadata, appendMetadata } = useCheckoutMetadata();
    const [errors, setErrors] = useState([]);
    const checkoutCreateJobFormId = "create-job-ad";
    const checkoutCreateJobFormRef = useRef<HTMLFormElement>(null);

    const initialValues: FormValues = {
      jobTitle: metadata && metadata[CheckoutMetadataTypes.JobTitle],
      jobDescription:
        metadata && metadata[CheckoutMetadataTypes.JobDescription],
      jobDetailLink: metadata && metadata[CheckoutMetadataTypes.VacancyURL],
      applicationLink:
        metadata && metadata[CheckoutMetadataTypes.ApplicationURL],
      jobExperience: metadata && metadata[CheckoutMetadataTypes.MinExp],
      employmentType:
        metadata &&
        findOptionByField(
          employmentTypes,
          metadata[CheckoutMetadataTypes.VacancyType],
          "enum"
        ),
      minHours: metadata && metadata[CheckoutMetadataTypes.MinWorkingHours],
      maxHours: metadata && metadata[CheckoutMetadataTypes.MaxWorkingHours],
      minSalary: metadata && metadata[CheckoutMetadataTypes.SalaryMinAmount],
      maxSalary: metadata && metadata[CheckoutMetadataTypes.SalaryMaxAmount],
      currency:
        metadata &&
        findOptionByField(
          currencies,
          metadata[CheckoutMetadataTypes.SalaryCurrency],
          "enum"
        ),
      period:
        metadata &&
        findOptionByField(
          periods,
          metadata[CheckoutMetadataTypes.SalaryPerPeriod],
          "enum"
        ),
      contactName: metadata && metadata[CheckoutMetadataTypes.ContactName],
      contactPhone: metadata && metadata[CheckoutMetadataTypes.ContactNumber],
    };

    useImperativeHandle(ref, () => () => {
      checkoutCreateJobFormRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    });

    return (
      <>
        <S.Title>Create your job ad(s)</S.Title>
        <TypedMetadataUpdateMutation
          onCompleted={data => {
            const newMetadata = {};
            const updateMetadata = data?.updateMetadata;
            setErrors(updateMetadata?.metadataErrors || []);
            if (updateMetadata?.metadataErrors?.length) {
              return;
            }
            const newData =
              updateMetadata?.item?.metadata.map(
                ({ key, value }: MetadataInput) => ({
                  [key]: value,
                })
              ) || [];
            Object.assign(newMetadata, ...newData);
            appendMetadata(newMetadata);
            onSubmitSuccess(CheckoutStep.Shipping);
          }}
          onError={error => {
            console.log(error, "error from on Error");
          }}
        >
          {(mutation, { loading, data }) => {
            console.log("mutation", mutation);
            console.log("data", data);

            return (
              <Formik
                initialValues={initialValues}
                onSubmit={(
                  {
                    jobTitle,
                    jobDescription,
                    jobDetailLink,
                    applicationLink,
                    jobExperience,
                    employmentType,
                    minHours,
                    maxHours,
                    minSalary,
                    maxSalary,
                    currency,
                    period,
                    contactName,
                    contactPhone,
                  },
                  actions
                ) => {
                  actions.setSubmitting(false);
                  mutation({
                    variables: {
                      id: checkout?.id || "",
                      metadata: [
                        {
                          key: CheckoutMetadataTypes.JobTitle,
                          value: jobTitle || "",
                        },
                        {
                          key: CheckoutMetadataTypes.JobDescription,
                          value: jobDescription || "",
                        },
                        {
                          key: CheckoutMetadataTypes.VacancyURL,
                          value: jobDetailLink || "",
                        },
                        {
                          key: CheckoutMetadataTypes.ApplicationURL,
                          value: applicationLink || "",
                        },
                        {
                          key: CheckoutMetadataTypes.MinExp,
                          value: jobExperience || "",
                        },
                        {
                          key: CheckoutMetadataTypes.VacancyType,
                          value: employmentType?.enum || "",
                        },
                        {
                          key: CheckoutMetadataTypes.MinWorkingHours,
                          value: minHours || "",
                        },
                        {
                          key: CheckoutMetadataTypes.MaxWorkingHours,
                          value: maxHours || "",
                        },
                        {
                          key: CheckoutMetadataTypes.SalaryMinAmount,
                          value: minSalary || "",
                        },
                        {
                          key: CheckoutMetadataTypes.SalaryMaxAmount,
                          value: maxSalary || "",
                        },
                        {
                          key: CheckoutMetadataTypes.SalaryCurrency,
                          value: currency?.enum || "",
                        },
                        {
                          key: CheckoutMetadataTypes.SalaryPerPeriod,
                          value: period?.enum || "",
                        },
                        {
                          key: CheckoutMetadataTypes.ContactName,
                          value: contactName || "",
                        },
                        {
                          key: CheckoutMetadataTypes.ContactNumber,
                          value: contactPhone || "",
                        },
                        {
                          key: CheckoutMetadataTypes.CompanyLogo,
                          value: "https://www.realtor.com/realtor-com.png",
                        },
                        {
                          key: CheckoutMetadataTypes.OrganizationName,
                          value: "organization",
                        },
                        {
                          key: CheckoutMetadataTypes.TrackingUtm,
                          value: "tracking utm",
                        },
                      ],
                    },
                  });
                }}
              >
                {({
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  values,
                  setFieldValue,
                  setFieldTouched,
                }) => (
                  <CreateJobContent
                    {...{
                      errors,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      values,
                      setFieldValue,
                      setFieldTouched,
                      checkoutCreateJobFormId,
                      checkoutCreateJobFormRef,
                    }}
                  />
                )}
              </Formik>
            );
          }}
        </TypedMetadataUpdateMutation>
      </>
    );
  }
);
CreateJobAd.displayName = "CreateJobAd";
export default CreateJobAd;
