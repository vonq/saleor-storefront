import { Form } from "formik";
import React, { useCallback } from "react";

import { InputSelect, TextField } from "@components/molecules";

import * as S from "./styles";
// import { ANONYMOUS_USER_PROPS, LOGGED_IN_USER_PROPS } from "./fixtures";

interface Props {
  handleChange?: any;
  handleSubmit?: any;
  handleBlur?: any;
  values?: any;
  setFieldValue?: any;
  setFieldTouched?: any;
  checkoutWorkAddressFormId?: any;
  checkoutWorkAddressFormRef?: any;
}

export const WorkAddressContent: React.FC<Props> = ({
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  setFieldValue,
  setFieldTouched,

  checkoutWorkAddressFormId,
  checkoutWorkAddressFormRef,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  const countries = [
    { country: "Netherlands" },
    { country: "Ukraine" },
    { country: "USA" },
    { country: "Great Britain" },
  ];

  return (
    <Form>
      <S.JobForm>
        <S.Wrapper>
          <S.RowWithOneCell>
            <S.Name>Company name</S.Name>
            <S.Sku>
              For whom will the candidates work for? Your candidates will see
              your company name at the published job posting.
            </S.Sku>
            <TextField
              name="companyName"
              value={values?.companyName}
              {...basicInputProps()}
            />
            <S.Name>Company department (optional)</S.Name>
            <TextField
              name="companyDepartment"
              value={values?.companyDepartment}
              {...basicInputProps()}
            />
            <S.RowWithTwoCells>
              <div>
                <S.Name>Working location. Country</S.Name>
                <InputSelect
                  // options={ANONYMOUS_USER_PROPS.countries}
                  options={countries}
                  optionLabelKey="country"
                  optionValueKey="country"
                  name="companyCountry"
                  label=""
                  value={values!.companyCountry}
                  onChange={(value: any, name: any) => {
                    setFieldValue(name, value);
                  }}
                />
              </div>
              <div>
                <S.Name>Working location. Zip code</S.Name>
                <TextField
                  name="companyZipCode"
                  // label="Enter a valid zip code of the work location."
                  value={values?.companyZipCode}
                  {...basicInputProps()}
                />
              </div>
            </S.RowWithTwoCells>
            <S.RowWithTwoCells>
              <div>
                <S.Name>Working location. City</S.Name>
                <TextField
                  name="companyCity"
                  // label="e.g. Amsterdam"
                  value={values?.companyCity}
                  {...basicInputProps()}
                />
              </div>
              <div>
                <S.Name>Working location. Address</S.Name>
                <TextField
                  name="companyAddress"
                  // required
                  value={values?.companyAddress}
                  {...basicInputProps()}
                />
              </div>
            </S.RowWithTwoCells>
          </S.RowWithOneCell>
        </S.Wrapper>
      </S.JobForm>
    </Form>
  );
};
