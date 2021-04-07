import { Formik } from "formik";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

import { CheckoutStep } from "./constants";
import { CreateJobContent } from "./CreateJobContent";
import * as S from "./styles";

export interface ICreateJobAdProps {
  changeSubmitProgress: any;
  onSubmitSuccess: any;
}

interface FormValues {
  jobTitle: string;
  industry: string;
  jobDescription: string;
  jobDatailLink: string;
  aplicationLink: string;
  jobExperience: string;
  educationLevel: string;
  employmentType: string;
  seniority: string;
  minHours: string;
  maxHours: string;
  minSalary: string;
  maxSalary: string;
  currency: string;
  period: string;
  contactName: string;
  contactPhone: string;
}

export const CreateJobAd: React.FC<ICreateJobAdProps> = forwardRef(
  ({ changeSubmitProgress, onSubmitSuccess }, ref) => {
    const checkoutCreateJobFormId = "create-job-ad";
    const checkoutCreateJobFormRef = useRef<HTMLFormElement>(null);

    const initialValues: FormValues = {
      jobTitle: "",
      industry: "",
      jobDescription: "",
      jobDatailLink: "",
      aplicationLink: "",
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
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            onSubmitSuccess(CheckoutStep.Shipping);
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
      </>
    );
  }
);
CreateJobAd.displayName = "CreateJobAd";
export default CreateJobAd;
