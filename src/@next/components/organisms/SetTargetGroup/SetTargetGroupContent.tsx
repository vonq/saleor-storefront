/* eslint-disable react/no-unescaped-entities */
// import { Editor } from "@tinymce/tinymce-react";
import React from "react";

import { InputSelect } from "@components/molecules";

import {
  EducationOptions,
  IndustryOptions,
  SeniorityOptions,
} from "./constants";
import * as S from "./styles";

interface Props {
  handleChange?: any;
  handleSubmit?: any;
  handleBlur?: any;
  values?: any;
  jobFunctionList: Array<any>;
  setFieldValue?: any;
  setFieldTouched?: any;
  checkoutSetTargetGroupFormId?: any;
  checkoutSetTargetGroupFormRef?: any;
  errors: any;
}

export const SetTargetGroupContent: React.FC<Props> = ({
  errors,
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  jobFunctionList,
  setFieldValue,
  setFieldTouched,
  checkoutSetTargetGroupFormId,
  checkoutSetTargetGroupFormRef,
}) => {
  // const basicInputProps = useCallback(
  //   () => ({ onBlur: handleBlur, onChange: handleChange }),
  //   [handleChange, handleBlur]
  // );
  const fieldErrors: any = {};

  if (errors) {
    errors.map(({ field, message }: { field: string; message: string }) => {
      fieldErrors[field] = fieldErrors[field]
        ? [...fieldErrors[field], { message }]
        : [{ message }];
    });
  }

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
            <S.RowWithTwoCells>
              <div>
                <S.Name>Job function</S.Name>
                <InputSelect
                  options={jobFunctionList}
                  optionLabelKey="name"
                  optionValueKey="id"
                  name="jobFunction"
                  value={values!.jobFunction}
                  errors={fieldErrors!.vacancyTaxonomyJobcategoryid}
                  label=""
                  onChange={(value: any, name: any) => {
                    setFieldValue(name, value);
                  }}
                />
              </div>
              <div>
                <S.Name>Industry</S.Name>
                <InputSelect
                  options={IndustryOptions}
                  optionLabelKey="name"
                  optionValueKey="id"
                  name="industry"
                  value={values!.industry}
                  errors={fieldErrors!.vacancyTaxonomyIndustry}
                  label=""
                  onChange={(value: any, name: any) => {
                    setFieldValue(name, value);
                  }}
                />
              </div>
              <div>
                <S.Name>Seniority</S.Name>
                <InputSelect
                  options={SeniorityOptions}
                  optionLabelKey="name"
                  optionValueKey="id"
                  name="seniority"
                  value={values!.seniority}
                  label=""
                  errors={fieldErrors!.vacancyTaxonomySeniorityid}
                  onChange={(value: any, name: any) => {
                    setFieldValue(name, value);
                  }}
                />
              </div>
              <div>
                <S.Name>Level of Education</S.Name>
                <InputSelect
                  options={EducationOptions}
                  optionLabelKey="name"
                  optionValueKey="id"
                  name="education"
                  value={values!.education}
                  label=""
                  errors={fieldErrors!.vacancyEducationlevelid}
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
