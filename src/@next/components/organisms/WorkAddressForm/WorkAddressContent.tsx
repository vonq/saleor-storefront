import React, { useCallback } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as S from "./styles";

import { InputSelect, TextField } from "@components/molecules";
// import { ANONYMOUS_USER_PROPS, LOGGED_IN_USER_PROPS } from "./fixtures";

export const WorkAddressContent = (
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  setFieldValue,
  setFieldTouched
) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

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
              // name="jobTitle"
              // value={values!.jobTitle}
              {...basicInputProps()}
            />
            <S.Name>Company department (optional)</S.Name>
            <TextField
              // name="jobTitle"
              // value={values!.jobTitle}
              {...basicInputProps()}
            />
            <S.RowWithTwoCells>
              <div>
                <S.Name>Working location. Country</S.Name>
                <InputSelect
                  // options={ANONYMOUS_USER_PROPS.countries}
                  optionLabelKey="period"
                  name="period"
                  onChange={(value: any, name: any) =>
                    setFieldValue(name, value)
                  }
                />
              </div>
              <div>
                <S.Name>Working location. Zip code</S.Name>
                <TextField
                  // name="jobTitle"
                  // label="Enter a valid zip code of the work location."
                  // value={values!.jobTitle}
                  {...basicInputProps()}
                />
              </div>
            </S.RowWithTwoCells>
            <S.RowWithTwoCells>
              <div>
                <S.Name>Working location. City</S.Name>
                <TextField
                  // name="jobTitle"
                  // label="e.g. Amsterdam"
                  // value={values!.jobTitle}
                  {...basicInputProps()}
                />
              </div>
              <div>
                <S.Name>Working location. Address</S.Name>
                <TextField
                  // name="jobTitle"
                  // label="Enter a street name and number."
                  // value={values!.jobTitle}
                  required
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
