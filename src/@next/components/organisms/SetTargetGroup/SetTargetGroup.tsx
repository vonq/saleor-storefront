/* eslint-disable no-console */
import { useCart, useCheckout } from "@saleor/sdk";
import { Formik } from "formik";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { CheckoutMetadataTypes } from "@app/CheckoutUtils/constants";
import { findOptionById } from "@app/CheckoutUtils/helpers";
import {
  MetadataInput,
  TypedMetadataUpdateMutation,
} from "@app/CheckoutUtils/updateMetadata";
import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";

import { CheckoutStep } from "../../../pages/CheckoutPage/utils";
import {
  EducationOptions,
  IndustryOptions,
  JobFunctionOptions,
  SeniorityOptions,
} from "./constants";
import { apolloClient, createCheckoutQuery } from "./queries";
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
    const [checkoutCreating, setCheckoutCreating] = useState(false);

    const initialValues: FormValues = {
      jobFunction:
        metadata &&
        findOptionById(
          JobFunctionOptions,
          metadata[CheckoutMetadataTypes.JobFunction]
        ),
      seniority:
        metadata &&
        findOptionById(
          SeniorityOptions,
          metadata[CheckoutMetadataTypes.Seniority]
        ),
      industry:
        metadata &&
        findOptionById(
          IndustryOptions,
          metadata[CheckoutMetadataTypes.Industry]
        ),
      education:
        metadata &&
        findOptionById(
          EducationOptions,
          metadata[CheckoutMetadataTypes.EducationLevel]
        ),
    };

    useImperativeHandle(ref, () => () => {
      checkoutSetTargetGroupFormRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    });

    useEffect(() => {
      const createCheckout = async () => {
        setCheckoutCreating(true);
        try {
          const response = await apolloClient.mutate({
            mutation: createCheckoutQuery,
            variables: {
              lines: (items || []).map(item => ({
                quantity: item.quantity,
                variantId: item.variant.id,
              })),
            },
          });
          const id = response?.data?.checkoutCreate?.checkout?.id;
          if (id) {
            localStorage.setItem(
              "data_checkout",
              JSON.stringify({
                id,
                lines: items,
              })
            );
          }
        } catch (error) {
          console.log("Error on creating checkout", error);
        } finally {
          setCheckoutCreating(false);
        }
      };
      if (!checkout?.id) {
        createCheckout();
      }
    }, []);

    if (checkoutCreating) {
      return null;
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
            const newData =
              data?.updateMetadata?.item?.metadata.map(
                ({ key, value }: MetadataInput) => ({
                  [key]: value,
                })
              ) || [];
            Object.assign(newMetadata, ...newData);
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
                  if (!checkout?.id) {
                    return;
                  }
                  mutation({
                    variables: {
                      id: checkout.id,
                      metadata: [
                        {
                          key: CheckoutMetadataTypes.JobFunction,
                          value: jobFunction.id,
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
                  onSubmitSuccess(CheckoutStep.SetTargetGroup);
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
