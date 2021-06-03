/* eslint-disable no-console */
import { useCart, useCheckout } from "@saleor/sdk";
import { Formik } from "formik";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { TypedMetadataUpdateMutation } from "@app/queries/updateMetadata";

import { CheckoutStep } from "../../../pages/CheckoutPage/utils";
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
    const [checkoutCreated, setCheckoutCreated] = useState(false);

    const initialValues: FormValues = {
      jobFunction: "",
      seniority: "",
      industry: "",
      education: "",
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
            const lines = data?.checkoutCreate?.checkout?.lines || [];
            localStorage.setItem(
              "data_checkout",
              JSON.stringify({
                id,
                lines,
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
            console.log(
              data,
              "SetTargetGroup on metadata update mutation complete"
            );
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
                          key: "vacancy_taxonomy_jobCategoryId",
                          value: jobFunction,
                        },
                        {
                          key: "vacancy_taxonomy_seniority",
                          value: seniority.enum,
                        },
                        {
                          key: "vacancy_taxonomy_industry",
                          value: industry.enum,
                        },
                        // {
                        //   key: "education",
                        //   value: education.enum,
                        // },
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
