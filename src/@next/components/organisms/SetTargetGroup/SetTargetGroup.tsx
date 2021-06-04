/* eslint-disable no-console */
import { useCart, useCheckout } from "@saleor/sdk";
import { Formik } from "formik";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { CheckoutMetadataTypes } from "@app/CheckoutUtils/constants";
import {
  MetadataInput,
  TypedMetadataUpdateMutation,
} from "@app/CheckoutUtils/updateMetadata";
import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";

import { CheckoutStep } from "../../../pages/CheckoutPage/utils";
import {
  EducationOptions,
  IndustryOptions,
  SeniorityOptions,
} from "./constants";
import { TypedCheckoutCreateMutation } from "./queries";
import { SetTargetGroupContent } from "./SetTargetGroupContent";
import * as S from "./styles";

export interface ISetTargetGroupProps {
  changeSubmitProgress: any;
  onSubmitSuccess: any;
}

interface FormValues {
  jobFunction: any;
  seniority: any;
  industry: any;
  education: any;
}

export const SetTargetGroup: React.FC<ISetTargetGroupProps> = forwardRef(
  ({ changeSubmitProgress, onSubmitSuccess }, ref) => {
    const checkoutSetTargetGroupFormId = "set-target-group";
    const checkoutSetTargetGroupFormRef = useRef<HTMLFormElement>(null);
    const { items } = useCart();
    const { checkout } = useCheckout();
    const { metadata, appendMetadata } = useCheckoutMetadata();
    const [checkoutCreated, setCheckoutCreated] = useState(false);

    const initialValues: FormValues = {
      jobFunction: metadata[CheckoutMetadataTypes.JobFunction],
      seniority: SeniorityOptions.find(
        option =>
          Number(option.id) ===
          Number(metadata[CheckoutMetadataTypes.Seniority])
      ),
      industry: IndustryOptions.find(
        option =>
          Number(option.id) === Number(metadata[CheckoutMetadataTypes.Industry])
      ),
      education: EducationOptions.find(
        option =>
          Number(option.id) ===
          Number(metadata[CheckoutMetadataTypes.EducationLevel])
      ),
    };

    useImperativeHandle(ref, () => () => {
      checkoutSetTargetGroupFormRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    });

    if (!checkout?.id) {
      return (
        <TypedCheckoutCreateMutation
          onCompleted={data => {
            const id = data?.checkoutCreate?.checkout?.id;
            localStorage.setItem(
              "data_checkout",
              JSON.stringify({
                id,
                lines: items,
              })
            );
          }}
          onError={error => console.log(error, "error from on Error")}
        >
          {(mutation, { loading, data }) => {
            if (checkoutCreated) {
              return null;
            }
            setCheckoutCreated(true);
            mutation({
              variables: {
                lines: (items || []).map(item => ({
                  quantity: item.quantity,
                  variantId: item.variant.id,
                })),
              },
            });
            return null;
          }}
        </TypedCheckoutCreateMutation>
      );
    }

    return (
      <>
        <S.Title>Set target group</S.Title>
        <S.Desc>
          Fill in the needed information for your job posting(s). Some fields
          are required by job boards to be able to post on it.
        </S.Desc>
        <TypedMetadataUpdateMutation
          onCompleted={data => {
            const newMetadata = {};
            Object.assign(
              newMetadata,
              ...data?.updateMetadata?.item?.metadata.map(
                ({ key, value }: MetadataInput) => ({
                  [key]: value,
                })
              )
            );
            appendMetadata(newMetadata);
          }}
          onError={error => console.log(error, "error from on Error")}
        >
          {(mutation, { loading, data }) => {
            return (
              <Formik
                initialValues={initialValues}
                onSubmit={(
                  { jobFunction, seniority, industry, education },
                  actions
                ) => {
                  if (!checkout.id) {
                    return;
                  }
                  mutation({
                    variables: {
                      id: checkout.id,
                      metadata: [
                        {
                          key: CheckoutMetadataTypes.JobFunction,
                          value: jobFunction,
                        },
                        {
                          key: CheckoutMetadataTypes.Seniority,
                          value: seniority.id,
                        },
                        {
                          key: CheckoutMetadataTypes.Industry,
                          value: industry.id,
                        },
                        {
                          key: CheckoutMetadataTypes.EducationLevel,
                          value: education.id,
                        },
                      ],
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
        </TypedMetadataUpdateMutation>
      </>
    );
  }
);
SetTargetGroup.displayName = "SetTargetGroup";
export default SetTargetGroup;
