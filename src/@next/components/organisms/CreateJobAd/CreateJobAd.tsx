/* eslint-disable no-console */
import { Formik } from "formik";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { TypedMetadataUpdateMutation } from "@app/queries/updateMetadata";

import { CheckoutStep } from "./constants";
import { CreateJobContent } from "./CreateJobContent";
import * as S from "./styles";

export interface ICreateJobAdProps {
  changeSubmitProgress: any;
  onSubmitSuccess: any;
  campaignId: any;
  setJobData?: any;
  setIndustry?: any;
  setTitle?: any;
}

interface FormValues {
  jobTitle: string;
  industry: any;
  jobDescription: string;
  jobDetailLink: string;
  applicationLink: string;
  jobExperience: string;
  educationLevel: string;
  employmentType: any;
  seniority: any;
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
      campaignId,
      setJobData,
      // setIndustry,
      // setTitle,
    },
    ref
  ) => {
    const checkoutCreateJobFormId = "create-job-ad";
    const checkoutCreateJobFormRef = useRef<HTMLFormElement>(null);
    const [backupData, setBackupData] = useState({});

    const initialValues: FormValues = {
      jobTitle: "",
      industry: { industry: "" },
      jobDescription: "",
      jobDetailLink: "",
      applicationLink: "",
      jobExperience: "",
      educationLevel: "",
      employmentType: "",
      seniority: "",
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
            // if (data.jobInfoCreate.jobInfo === null) {
            //   setJobData(backupData);
            // } else {
            //   setJobData({
            //     title: data.jobInfoCreate.jobInfo.title,
            //     industry: data.jobInfoCreate.jobInfo.industry,
            //     education: data.jobInfoCreate.jobInfo.education,
            //     jobDescription: data.jobInfoCreate.jobInfo.jobDescription,
            //     linkToJobDetailPage:
            //       data.jobInfoCreate.jobInfo.linkToJobDetailPage,
            //     linkToJobAppPage: data.jobInfoCreate.jobInfo.linkToJobAppPage,
            //     expYear: data.jobInfoCreate.jobInfo.expYear,
            //     hoursPerWeek: data.jobInfoCreate.jobInfo.hoursPerWeek,
            //     salaryInterval: data.jobInfoCreate.jobInfo.salaryInterval,
            //     contactInfoName: data.jobInfoCreate.jobInfo.contactInfoName,
            //     contactPhone: data.jobInfoCreate.jobInfo.contactPhone,
            //     currency: data.jobInfoCreate.jobInfo.currency,
            //     period: data.jobInfoCreate.jobInfo.period,
            //     employmentType: data.jobInfoCreate.jobInfo.employmentType,
            //   });
            // }
            onSubmitSuccess(CheckoutStep.Shipping);
            // setIndustry(data.jobInfoCreate.jobInfo.industry);
            // setTitle(data.jobInfoCreate.jobInfo.title);
          }}
          onError={error => {
            console.log(error, "error from on Error");
            setJobData(backupData);
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
                    industry,
                    jobDescription,
                    jobDetailLink,
                    applicationLink,
                    jobExperience,
                    educationLevel,
                    employmentType,
                    seniority,
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
                  setBackupData({
                    title: jobTitle,
                    industry: industry.industry,
                    jobDescription,
                    linkToJobDetailPage: jobDetailLink,
                    linkToJobAppPage: applicationLink,
                    expYear: jobExperience,
                    education: educationLevel,
                    employmentType: employmentType.type,
                    seniority: seniority.seniority,
                    hoursPerWeek: [minHours, maxHours],
                    salaryInterval: [minSalary, maxSalary],
                    currency: currency.enum,
                    period: period.period,
                    contactInfoName: contactName,
                    contactPhone,
                  });
                  actions.setSubmitting(false);
                  mutation({
                    variables: {
                      id: campaignId,
                      metadata: [
                        { key: "vacancy.jobTitle", value: jobTitle },
                        { key: "vacancy.industry", value: industry.enum },
                        { key: "vacancy.description", value: jobDescription },
                        {
                          key: "vacancy.tracking.vacancyUrl",
                          value: jobDetailLink,
                        },
                        {
                          key: "vacancy.tracking.applicationUrl",
                          value: applicationLink,
                        },
                        { key: "vacancy.expYear", value: jobExperience },
                        { key: "vacancy.education", value: educationLevel },
                        {
                          key: "vacancy.employmentType",
                          value: employmentType.enum,
                        },
                        { key: "vacancy.seniority", value: seniority.enum },
                        {
                          key: "vacancy.workingHours.minimum",
                          value: minHours,
                        },
                        {
                          key: "vacancy.workingHours.maximum",
                          value: maxHours,
                        },
                        {
                          key: "vacancy.salary.minimumAmount",
                          value: minSalary,
                        },
                        {
                          key: "vacancy.salary.maximumAmount",
                          value: maxSalary,
                        },
                        {
                          key: "vacancy.salary.currency",
                          value: currency.enum,
                        },
                        { key: "vacancy.salary.perPeriod", value: period.enum },
                        { key: "contactInfo.name", value: contactName },
                        { key: "contactInfo.phoneNumber", value: contactPhone },
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
