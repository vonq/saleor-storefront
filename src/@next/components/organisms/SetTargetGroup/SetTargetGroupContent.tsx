/* eslint-disable react/no-unescaped-entities */
// import { Editor } from "@tinymce/tinymce-react";
import React, { useCallback, useContext } from "react";

import { InputSelect, TextField } from "@components/molecules";
import { ShopContext } from "@temp/components/ShopProvider/context";

import { educationLvl, inds, senioritis } from "./constants";
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
  const { countries } = useContext(ShopContext);

  return (
    <form
      id={checkoutSetTargetGroupFormId}
      ref={checkoutSetTargetGroupFormRef}
      onSubmit={handleSubmit}
    >
      <S.JobForm>
        <S.Wrapper>
          <S.RowWithOneCell>
            <S.SubTitle>Job</S.SubTitle>
            <S.Name>Title</S.Name>
            <TextField
              name="title"
              value={values!.title}
              {...basicInputProps()}
            />
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
                <S.Name>Region</S.Name>
                <InputSelect
                  options={countries}
                  optionLabelKey="country"
                  optionValueKey="country"
                  name="country"
                  value={values!.country}
                  label=""
                  onChange={(value: any, name: any) => {
                    // eslint-disable-next-line no-console
                    console.log("value country", value);
                    setFieldValue(name, value);
                  }}
                />
              </div>
              <div>
                <S.Name>Industry</S.Name>
                <InputSelect
                  options={inds}
                  optionLabelKey="industry"
                  optionValueKey="industry"
                  name="industry"
                  value={values!.industry}
                  label=""
                  onChange={(value: any, name: any) => {
                    setFieldValue(name, value);
                  }}
                />
              </div>
            </S.RowWithTwoCells>
            <S.Name>Candidate</S.Name>
            <S.RowWithTwoCells>
              <div>
                <S.Name>Seniority</S.Name>
                <InputSelect
                  options={senioritis}
                  optionLabelKey="seniority"
                  optionValueKey="seniority"
                  // placeholder="Select"
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
                  options={educationLvl}
                  optionLabelKey="value"
                  optionValueKey="value"
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
