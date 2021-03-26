import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { WorkAddressContent } from "./WorkAddressContent";

export interface IWorkAddressFormProps {}

export const WorkAddressForm: React.FC<IWorkAddressFormProps> = () => {
  return (
    <>
      <Formik
        initialValues={[]}
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
        }) => <WorkAddressContent />}
      </Formik>
    </>
  );
};
WorkAddressForm.displayName = "WorkAddressForm";
export default WorkAddressForm;
