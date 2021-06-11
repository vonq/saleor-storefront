import { Formik } from "formik";
import React from "react";

import * as CheckoutStyle from "@app/CheckoutUtils/styles";
import { Radio } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const statuses = [
  { token: "charged", label: "Charged" },
  { token: "fully-refunded", label: "Fully refunded" },
  { token: "not-charged", label: "Not charged" },
];

/**
 * Vonq payment gateway.
 */
const VonqPaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  initialStatus,
}: IProps) => {
  return (
    <Formik
      initialValues={{ status: initialStatus || statuses[0].token }}
      onSubmit={values => {
        processPayment(values.status);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        isSubmitting,
        isValid,
      }) => (
        <CheckoutStyle.CheckoutStep>
          <S.Form
            id={formId}
            ref={formRef}
            onSubmit={handleSubmit}
            data-test="vonqPaymentGatewayForm"
          >
            {config.map(({ field: token, value: label }) => {
              if (!label) {
                return null;
              }
              const { balance } = JSON.parse(label);
              return (
                <S.Status key={token}>
                  <Radio
                    key={token}
                    type="radio"
                    name="status"
                    value={token}
                    checked={values.status === token}
                    onChange={handleChange}
                  >
                    <span>{`${token}: ${balance}`}</span>
                  </Radio>
                </S.Status>
              );
            })}
          </S.Form>
        </CheckoutStyle.CheckoutStep>
      )}
    </Formik>
  );
};

export { VonqPaymentGateway };
