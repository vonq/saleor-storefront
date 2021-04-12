/* eslint-disable no-console */
import { Formik } from "formik";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

import { CheckoutStep } from "../../../pages/CheckoutPage/utils";
import { TypedCampaingCreateMutation } from "./queries";
import { SetTargetGroupContent } from "./SetTargetGroupContent";
import * as S from "./styles";

export interface ISetTargetGroupProps {
  changeSubmitProgress: any;
  onSubmitSuccess: any;
  setCampaignId: (args?: any) => void;
}

interface FormValues {
  title: any;
  jobFunction: any;
  country: any;
  seniority: any;
  industry: any;
  education: any;
}

export const SetTargetGroup: React.FC<ISetTargetGroupProps> = forwardRef(
  ({ changeSubmitProgress, onSubmitSuccess, setCampaignId }, ref) => {
    const checkoutSetTargetGroupFormId = "set-target-group";
    const checkoutSetTargetGroupFormRef = useRef<HTMLFormElement>(null);

    const initialValues: FormValues = {
      title: "",
      jobFunction: "",
      country: "",
      seniority: "",
      industry: "",
      education: "",
    };

    useImperativeHandle(ref, () => () => {
      checkoutSetTargetGroupFormRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    });

    return (
      <>
        <S.Title>Set target group</S.Title>
        <S.Desc>
          Fill in the needed information for your job posting(s). Some fields
          are required by job boards to be able to post on it.
        </S.Desc>
        <TypedCampaingCreateMutation
          onCompleted={data => {
            // console.log(data, "data from onCompleted");
            // console.log(data.campaignCreate.campaign.id);
            setCampaignId(data.campaignCreate.campaign.id);
          }}
          onError={error => console.log(error, "error from on Error")}
        >
          {(mutation, { loading, data }) => {
            console.log(data, "dataaaaaaaaaaaaaa");

            return (
              <Formik
                initialValues={initialValues}
                onSubmit={(
                  {
                    title,
                    jobFunction,
                    country,
                    seniority,
                    industry,
                    education,
                  },
                  actions
                ) => {
                  console.log(
                    title,
                    jobFunction,
                    country,
                    seniority,
                    industry,
                    education
                  );
                  mutation({
                    variables: {
                      title,
                      jobFunction,
                      country: country.code,
                      seniority: seniority.enum,
                      industry: industry.enum,
                      education: education.enum,
                    },
                  });
                  actions.setSubmitting(false);
                  onSubmitSuccess(CheckoutStep.Address);
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
                  <SetTargetGroupContent
                    {...{
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      values,
                      setFieldValue,
                      setFieldTouched,
                      checkoutSetTargetGroupFormId,
                      checkoutSetTargetGroupFormRef,
                    }}
                  />
                )}
              </Formik>
            );
          }}
        </TypedCampaingCreateMutation>
      </>
    );
  }
);
SetTargetGroup.displayName = "SetTargetGroup";
export default SetTargetGroup;
