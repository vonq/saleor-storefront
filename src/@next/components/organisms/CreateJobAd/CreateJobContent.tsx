/* eslint-disable react/no-unescaped-entities */
// import { Editor } from "@tinymce/tinymce-react";
import { Editor } from "@tinymce/tinymce-react";
// import { FieldArray } from "formik";
import React, { useCallback, useState } from "react";

import * as CheckoutStyle from "@app/CheckoutUtils/styles";
import { ErrorMessage } from "@components/atoms";
import { InputSelect, TextField } from "@components/molecules";

import { currencies, employmentTypes, periods } from "./constants";
import { MoreInfoModal } from "./MoreInfoModal";
import * as S from "./styles";

const {
  SubTitleContainer,
  SubTitleStatus,
  SubTitleText,
  CheckoutStep,
  FieldLabel,
  FieldDescription,
} = CheckoutStyle;

interface Props {
  errors: any;
  handleChange?: any;
  handleSubmit?: any;
  handleBlur?: any;
  values?: any;
  setFieldValue?: any;
  setFieldTouched?: any;
  checkoutCreateJobFormId: any;
  checkoutCreateJobFormRef: any;
}

export const CreateJobContent: React.FC<Props> = ({
  errors,
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  setFieldValue,
  setFieldTouched,
  checkoutCreateJobFormId,
  checkoutCreateJobFormRef,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  const [isChecked, setIsChecked] = useState(true);
  const [moreInfo, setMoreInfo] = useState(false);

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
      id={checkoutCreateJobFormId}
      ref={checkoutCreateJobFormRef}
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <S.JobForm>
        <S.Wrapper>
          <S.RowWithOneCell>
            <CheckoutStep>
              <SubTitleContainer>
                <SubTitleStatus>1</SubTitleStatus>
                <SubTitleText>Job posting details</SubTitleText>
              </SubTitleContainer>
              <FieldLabel>Job title</FieldLabel>
              <FieldDescription>
                This is the job title which will be shown to your candidates:
              </FieldDescription>
              <TextField
                name="jobTitle"
                value={values!.jobTitle}
                errors={fieldErrors!.vacancyJobtitle}
                {...basicInputProps()}
              />
              <FieldLabel>Job description</FieldLabel>
              <FieldDescription>
                Choose how you want to fill in your job description.
                <S.MoreInfo
                  type="button"
                  onClick={() => {
                    setMoreInfo(true);
                  }}
                >
                  More info
                </S.MoreInfo>
              </FieldDescription>
              {moreInfo && (
                <MoreInfoModal hideModal={() => setMoreInfo(false)} />
              )}
              <S.Label>
                <S.Radio
                  type="radio"
                  id="radio"
                  name="text-editor"
                  onChange={() => setIsChecked(prev => !prev)}
                  checked={isChecked}
                  // onChange={e => setRadio(e.target.name)}
                />
                Text editor
              </S.Label>
              <S.Label>
                <S.Radio
                  type="radio"
                  id="radio2"
                  name="text-editor"
                  onChange={() => setIsChecked(prev => !prev)}
                  // onChange={e => setRadio(e.target.name)}
                  checked={!isChecked}
                />
                Upload Pdf/Word
              </S.Label>
              {isChecked ? (
                <S.TextArea>
                  <Editor
                    apiKey="dy0aqtllm0lgrod3ysxqvq8wrmv84k07gj0ylhnqbr2w2uu1"
                    value={values!.jobDescription}
                    init={{
                      height: 200,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        // eslint-disable-next-line no-multi-str
                        "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help",
                    }}
                    onEditorChange={(content, editor) => {
                      setFieldValue("jobDescription", content);
                    }}
                  />
                  <ErrorMessage errors={fieldErrors!.vacancyDescription} />
                </S.TextArea>
              ) : (
                <div>value2</div>
              )}
              <FieldLabel>Link to job detail page</FieldLabel>
              <FieldDescription>
                Fill in the URL that will be used as the landing page for your
                job ads.
              </FieldDescription>
              <TextField
                name="jobDetailLink"
                label="https://careers.company.com/job"
                value={values!.jobDetailLink}
                errors={fieldErrors!.vacancyTrackingVacancyUrl}
                {...basicInputProps()}
              />
              <FieldLabel>Link to application page</FieldLabel>
              <FieldDescription>
                Fill in the URL of the page where a candidate fills in the
                application. Depending on your application process, this can
                also be the job detail page.
              </FieldDescription>
              <TextField
                name="applicationLink"
                label="https://careers.company.com/job/apply"
                value={values!.applicationLink}
                errors={fieldErrors!.vacancyTrackingApplicationurl}
                {...basicInputProps()}
              />
            </CheckoutStep>
            <CheckoutStep>
              <SubTitleContainer>
                <SubTitleStatus>2</SubTitleStatus>
                <SubTitleText>Job criteria</SubTitleText>
              </SubTitleContainer>
              <FieldDescription>
                We will use this data to better target your desired audience.
              </FieldDescription>
              <FieldLabel>Minimum no. years of experience</FieldLabel>
              <S.Experience>
                <TextField
                  name="jobExperience"
                  label="e.g. 5+"
                  value={values!.jobExperience}
                  errors={fieldErrors!.vacancyMinimumyearsofexperience}
                  {...basicInputProps()}
                />
              </S.Experience>
              <FieldLabel>Employment Type</FieldLabel>
              <S.InputSelectWrapper>
                <InputSelect
                  options={employmentTypes}
                  optionLabelKey="type"
                  optionValueKey="type"
                  // placeholder="Select"
                  name="employmentType"
                  label=""
                  value={values!.employmentType}
                  errors={fieldErrors!.vacancyType}
                  onChange={(value: any, name: any) =>
                    setFieldValue(name, value)
                  }
                />
              </S.InputSelectWrapper>
              <FieldLabel>Hours per week</FieldLabel>
              <S.Hours>
                <S.Label>
                  Min.
                  <S.Number
                    type="number"
                    min="1"
                    name="minHours"
                    value={values!.minHours}
                    onChange={event =>
                      setFieldValue(event.target.name, event.target.value)
                    }
                  />
                  <ErrorMessage
                    errors={fieldErrors!.vacancyWorkinghoursMinimum}
                  />
                </S.Label>
                <S.LabelRight>
                  Max.
                  <S.Number
                    type="number"
                    min="1"
                    name="maxHours"
                    value={values!.maxHours}
                    onChange={event =>
                      setFieldValue(event.target.name, event.target.value)
                    }
                  />
                  <ErrorMessage
                    errors={fieldErrors!.vacancyWorkinghoursMaximum}
                  />
                </S.LabelRight>
              </S.Hours>
              <FieldLabel>Salary</FieldLabel>
              <FieldDescription>
                Please note: don't use a decimal separator e.g. 3500 instead of
                3.500.
              </FieldDescription>
              <S.Salary>
                <S.SalaryInputContainer>
                  From
                  <S.SalaryInput
                    type="number"
                    placeholder="2500"
                    min="1"
                    value={values!.minSalary}
                    name="minSalary"
                    onChange={event =>
                      setFieldValue(event.target.name, event.target.value)
                    }
                  />
                  <ErrorMessage
                    errors={fieldErrors!.vacancySalaryMinimumamount}
                  />
                </S.SalaryInputContainer>
                <S.SalaryInputContainer>
                  To
                  <S.SalaryInput
                    type="number"
                    placeholder="3500"
                    name="maxSalary"
                    value={values!.maxSalary}
                    onChange={event =>
                      setFieldValue(event.target.name, event.target.value)
                    }
                  />
                  <ErrorMessage
                    errors={fieldErrors!.vacancySalaryMaximumamount}
                  />
                </S.SalaryInputContainer>
              </S.Salary>
              <S.Salary>
                <S.SalarySelectContainer>
                  In the currency
                  <S.SalaryCurrency>
                    <InputSelect
                      options={currencies}
                      optionLabelKey="currency"
                      optionValueKey="enum"
                      name="currency"
                      label=""
                      value={values!.currency}
                      errors={fieldErrors!.vacancySalaryCurrency}
                      onChange={(value: any, name: any) =>
                        setFieldValue(name, value)
                      }
                    />
                  </S.SalaryCurrency>
                </S.SalarySelectContainer>
                <S.SalarySelectContainer>
                  Period
                  <S.SalaryPeriod>
                    <InputSelect
                      options={periods}
                      optionLabelKey="period"
                      optionValueKey="period"
                      label=""
                      value={values.period}
                      name="period"
                      errors={fieldErrors!.vacancySalaryPerperiod}
                      onChange={(value: any, name: any) =>
                        setFieldValue(name, value)
                      }
                    />
                  </S.SalaryPeriod>
                </S.SalarySelectContainer>
              </S.Salary>
            </CheckoutStep>
            <CheckoutStep>
              <SubTitleContainer>
                <SubTitleStatus>3</SubTitleStatus>
                <SubTitleText>Contact information for candidates</SubTitleText>
              </SubTitleContainer>
              <S.RowWithTwoCells>
                <div>
                  <FieldLabel>Name</FieldLabel>
                  <FieldDescription>
                    Leave a contact name (or general company info), so that your
                    job can be properly placed on job boards that require this
                    information.
                  </FieldDescription>
                  <TextField
                    name="contactName"
                    // label="https://careers.company.com/job"
                    value={values!.contactName}
                    errors={fieldErrors!.contactInfoName}
                    {...basicInputProps()}
                  />
                </div>
                <div>
                  <FieldLabel>Phone number</FieldLabel>
                  <FieldDescription>
                    Some channels require a phone number to post a job. Leave a
                    contact person phone number or a general company number.
                  </FieldDescription>
                  <TextField
                    name="contactPhone"
                    // label="https://careers.company.com/job"
                    value={values!.contactPhone}
                    autoComplete="tel"
                    errors={fieldErrors!.contactInfoPhonenumber}
                    {...basicInputProps()}
                  />
                </div>
              </S.RowWithTwoCells>
            </CheckoutStep>
            {/* <button type="submit">Submit</button> */}
          </S.RowWithOneCell>
        </S.Wrapper>
      </S.JobForm>
    </form>
  );
};
