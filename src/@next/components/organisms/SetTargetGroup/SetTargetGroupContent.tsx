/* eslint-disable react/no-unescaped-entities */
// import { Editor } from "@tinymce/tinymce-react";
import React from "react";

import * as CheckoutStyle from "@app/CheckoutUtils/styles";
import { InputSelect } from "@components/molecules";

import {
  EducationOptions,
  IndustryOptions,
  SeniorityOptions,
} from "./constants";
import * as S from "./styles";

const {
  SubTitleText,
  CheckoutStep,
  FieldLabel,
  FieldDescription,
} = CheckoutStyle;

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
            <CheckoutStep>
              <SubTitleText>Categorize the job</SubTitleText>
              <S.Sku>
                Choose from thousands of job functions available in our
                database.
              </S.Sku>
              <FieldLabel>Job function</FieldLabel>
              <FieldDescription>
                Select a matching job function (used to select the best
                performing channels).
              </FieldDescription>
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
              <FieldLabel>Industry</FieldLabel>
              <FieldDescription>
                Please fill in the industry of the job.
              </FieldDescription>
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
              <FieldLabel>Seniority</FieldLabel>
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
              <FieldLabel>Level of Education</FieldLabel>
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
            </CheckoutStep>
          </S.RowWithOneCell>
        </S.Wrapper>
      </S.JobForm>
    </form>
  );
};
