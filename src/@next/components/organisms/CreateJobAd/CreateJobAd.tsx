/* eslint-disable no-console */
import { useCheckout } from "@saleor/sdk";
import { Formik } from "formik";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

import { TypedMetadataUpdateMutation } from "@app/queries/updateMetadata";

import { CheckoutStep } from "./constants";
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
  educationLevel: string;
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
    const checkoutCreateJobFormId = "create-job-ad";
    const checkoutCreateJobFormRef = useRef<HTMLFormElement>(null);

    const initialValues: FormValues = {
      jobTitle: "",
      jobDescription: "",
      jobDetailLink: "",
      applicationLink: "",
      jobExperience: "",
      educationLevel: "",
      employmentType: "",
      minHours: "",
      maxHours: "",
      minSalary: "",
      maxSalary: "",
      currency: "",
      period: "",
      contactName: "",
      contactPhone: "",
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
            console.log(data, "data from onCompleted");
            onSubmitSuccess(CheckoutStep.Shipping);
          }}
          onError={error => {
            console.log(error, "error from on Error");
            onSubmitSuccess(CheckoutStep.Shipping);
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
                    educationLevel,
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
                  if (!checkout?.id) {
                    return;
                  }
                  actions.setSubmitting(false);
                  mutation({
                    variables: {
                      id: checkout?.id,
                      metadata: [
                        { key: "vacancy_jobTitle", value: jobTitle },
                        { key: "vacancy_description", value: jobDescription },
                        {
                          key: "vacancy_tracking_vacancy_url",
                          value: jobDetailLink,
                        },
                        {
                          key: "vacancy_tracking_applicationUrl",
                          value: applicationLink,
                        },
                        // { key: "vacancy.expYear", value: jobExperience },
                        // { key: "vacancy.education", value: educationLevel },
                        // {
                        //   key: "vacancy.employmentType",
                        //   value: employmentType.enum,
                        // },
                        // {
                        //   key: "vacancy.workingHours.minimum",
                        //   value: minHours,
                        // },
                        // {
                        //   key: "vacancy.workingHours.maximum",
                        //   value: maxHours,
                        // },
                        // {
                        //   key: "vacancy.salary.minimumAmount",
                        //   value: minSalary,
                        // },
                        // {
                        //   key: "vacancy.salary.maximumAmount",
                        //   value: maxSalary,
                        // },
                        // {
                        //   key: "vacancy.salary.currency",
                        //   value: currency.enum,
                        // },
                        // { key: "vacancy.salary.perPeriod", value: period.enum },
                        { key: "contactInfo_name", value: contactName },
                        { key: "contactInfo_phoneNumber", value: contactPhone },
                      ],
                    },
                  });
                  // onSubmitSuccess(CheckoutStep.Shipping);
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
