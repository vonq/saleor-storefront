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
    isNewLocation,
    // companies,
    setCompanies,
  } = useContext(WorkAddressContext);

  return (
    <>
      <Formik
        initialValues={workLocationData}
        onSubmit={(values, actions) => {
          setWorkLocationData(values);
          if (isNewLocation) {
            setCompanies((prevState: any) => [...prevState, values]);
          } else {
            setCompanies((prevState: any[]) =>
              prevState.map(company => {
                if (company.id === values.id) {
                  return { ...company, ...values };
                }

                return company;
              })
            );
          }
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
