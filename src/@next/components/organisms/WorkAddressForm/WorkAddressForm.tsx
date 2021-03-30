import { Formik } from "formik";
import React, { useContext } from "react";

import { WorkAddressContext } from "../WorkAddress/context";
import { WorkAddressContent } from "./WorkAddressContent";

export interface IWorkAddressFormProps {
  checkoutWorkAddressFormId?: any;
  checkoutWorkAddressFormRef?: any;
  hideModal?: any;
}

export const WorkAddressForm: React.FC<IWorkAddressFormProps> = ({
  checkoutWorkAddressFormId,
  checkoutWorkAddressFormRef,
  hideModal,
  // workLocationData,
}) => {
  const {
    workLocationData,
    setWorkLocationData,
    setIsNewLocation,
  } = useContext(WorkAddressContext);

  // console.log(workLocationData);

  return (
    <>
      <Formik
        initialValues={workLocationData}
        onSubmit={(values, actions) => {
          // console.log({ values, actions });
          setWorkLocationData(values);
          setIsNewLocation(false);
          actions.setSubmitting(false);
          hideModal();
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
              checkoutWorkAddressFormId,
              checkoutWorkAddressFormRef,
            }}
          />
        )}
      </Formik>
    </>
  );
};
WorkAddressForm.displayName = "WorkAddressForm";
export default WorkAddressForm;
