/* eslint-disable react/no-unescaped-entities */
// import { Editor } from "@tinymce/tinymce-react";
import React, { useCallback } from "react";

import { InputSelect, TextField } from "@components/molecules";

// import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";
import { educationLevel, industries, seniorities } from "./constants";
import * as S from "./styles";

interface Props {
  handleChange?: any;
  handleSubmit?: any;
  handleBlur?: any;
  values?: any;
  setFieldValue?: any;
  setFieldTouched?: any;
  checkoutSetTargetGroupFormId?: any;
  checkoutSetTargetGroupFormRef?: any;
}

export const SetTargetGroupContent: React.FC<Props> = ({
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  setFieldValue,
  setFieldTouched,
  checkoutSetTargetGroupFormId,
  checkoutSetTargetGroupFormRef,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  return (
    <form
      id={checkoutSetTargetGroupFormId}
      ref={checkoutSetTargetGroupFormRef}
      onSubmit={handleSubmit}
    >
      <S.JobForm>
        <S.Wrapper>
          <S.RowWithOneCell>
            <S.SubTitle>Categorize the job</S.SubTitle>
            <S.Sku>
              Choose from thousands of job functions available in our database.
            </S.Sku>
            <S.Name>Job function</S.Name>
            <TextField
              name="jobFunction"
              value={values!.jobFunction}
              {...basicInputProps()}
            />
            <S.RowWithTwoCells>
              <div>
                <S.Name>Industry</S.Name>
                <InputSelect
                  options={industries}
                  optionLabelKey="name"
                  optionValueKey="id"
                  name="industry"
                  value={values!.industry}
                  label=""
                  onChange={(value: any, name: any) => {
                    setFieldValue(name, value);
                  }}
                />
              </div>
              <div>
                <S.Name>Seniority</S.Name>
                <InputSelect
                  options={seniorities}
                  optionLabelKey="name"
                  optionValueKey="id"
                  name="seniority"
                  value={values!.seniority}
                  label=""
                  onChange={(value: any, name: any) => {
                    setFieldValue(name, value);
                  }}
                />
              </div>
              <div>
                <S.Name>Level of Education</S.Name>
                <InputSelect
                  options={educationLevel}
                  optionLabelKey="name"
                  optionValueKey="id"
                  name="education"
                  value={values!.education}
                  label=""
                  onChange={(value: any, name: any) => {
                    setFieldValue(name, value);
                  }}
                />
              </div>
            </S.RowWithTwoCells>
          </S.RowWithOneCell>
        </S.Wrapper>
      </S.JobForm>
    </form>
  );
};
