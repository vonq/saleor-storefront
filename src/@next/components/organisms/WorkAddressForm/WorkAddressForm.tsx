import { Formik } from "formik";
import React from "react";

import { WorkAddressContent } from "./WorkAddressContent";

export interface IWorkAddressFormProps {}

export const WorkAddressForm: React.FC<IWorkAddressFormProps> = () => {
  return (
    <>
      <Formik
        initialValues={[]}
        onSubmit={(values, actions) => {
          // console.log({ values, actions });
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
          <WorkAddressContent
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
WorkAddressForm.displayName = "WorkAddressForm";
export default WorkAddressForm;
