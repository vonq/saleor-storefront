import React from "react";
import { Formik } from "formik";
import * as S from "./styles";

import { CreateJobContent } from "./CreateJobContent";

export interface ICreateJobAdProps {}

interface FormValues {
  jobTitle: string;
  industry: string;
  text: string;
  jobDatailLink: string;
  aplicationLink: string;
  jobExperience: string;
  educationLevel: string[];
  employmentType: object;
  seniority: object;
  minHours: string;
  maxHours: string;
  minSalary: string;
  maxSalary: string;
  currency: object;
  period: object;
  contactName: string;
  contactPhone: string;
}

export const CreateJobAd: React.FC<ICreateJobAdProps> = () => {
  const initialValues: FormValues = {
    jobTitle: "",
    industry: "",
    text: "",
    jobDatailLink: "",
    aplicationLink: "",
    jobExperience: "",
    educationLevel: [],
    employmentType: {},
    seniority: {},
    minHours: "",
    maxHours: "",
    minSalary: "",
    maxSalary: "",
    currency: {},
    period: {},
    contactName: "",
    contactPhone: "",
  };

  return (
    <>
      <S.Title>Create your job ad(s)</S.Title>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          actions.setSubmitting(false);
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
            }}
          />
        )}
      </Formik>
    </>
  );
};
CreateJobAd.displayName = "CreateJobAd";
export default CreateJobAd;
