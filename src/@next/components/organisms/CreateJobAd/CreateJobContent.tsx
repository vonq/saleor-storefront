/* eslint-disable react/no-unescaped-entities */
// import { Editor } from "@tinymce/tinymce-react";
import { Editor } from "@tinymce/tinymce-react";
// import { FieldArray } from "formik";
import React, { useCallback, useState } from "react";

import { ErrorMessage } from "@components/atoms";
import { InputSelect, TextField } from "@components/molecules";

import { currencies, employmentTypes, periods } from "./constants";
import { MoreInfoModal } from "./MoreInfoModal";
import * as S from "./styles";

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
          <S.SubTitle>1 Job posting details</S.SubTitle>
          <S.Desc>
            Fill in the needed information for your job posting(s). Some fields
            are required by job boards to be able to post on it.
          </S.Desc>
          <S.RowWithOneCell>
            <S.Name>Job title</S.Name>
            <S.Sku>
              This is the job title which will be shown to your candidates:
            </S.Sku>
            <TextField
              name="jobTitle"
              value={values!.jobTitle}
              errors={fieldErrors!.vacancyJobtitle}
              {...basicInputProps()}
            />
            <S.Name>Job description</S.Name>
            <S.Sku>
              Choose how you want to fill in your job description.
              <S.MoreInfo
                type="button"
                onClick={() => {
                  setMoreInfo(true);
                }}
              >
                More info
              </S.MoreInfo>
            </S.Sku>
            {moreInfo && <MoreInfoModal hideModal={() => setMoreInfo(false)} />}
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
                  initialValue={values!.jobDescription}
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
                  // name="text"
                  onEditorChange={(content, editor) => {
                    setFieldValue("jobDescription", content);
                    // console.log("Content was updated:", content);
                    // console.log("editor:", editor);
                  }}
                />
                <ErrorMessage errors={fieldErrors!.vacancyDescription} />
              </S.TextArea>
            ) : (
              <div>value2</div>
            )}
            <S.Name>Link to job detail page</S.Name>
            <S.Sku>
              Fill in the URL that will be used as the landing page for your job
              ads.
            </S.Sku>
            <TextField
              name="jobDetailLink"
              label="https://careers.company.com/job"
              value={values!.jobDetailLink}
              errors={fieldErrors!.vacancyTrackingVacancyUrl}
              {...basicInputProps()}
            />
            <S.Name>Link to application page</S.Name>
            <S.Sku>
              Fill in the URL of the page where a candidate fills in the
              application. Depending on your application process, this can also
              be the job detail page.
            </S.Sku>
            <TextField
              name="applicationLink"
              label="https://careers.company.com/job/apply"
              value={values!.applicationLink}
              errors={fieldErrors!.vacancyTrackingApplicationurl}
              {...basicInputProps()}
            />
            <S.SubTitle>2 Job criteria</S.SubTitle>
            <S.Sku>
              We will use this data to better target your desired audience.
            </S.Sku>
            <S.Name>Minimum no. years of experience</S.Name>
            <S.Experience>
              <TextField
                name="jobExperience"
                label="e.g. 5+"
                value={values!.jobExperience}
                errors={fieldErrors!.vacancyMinimumyearsofexperience}
                {...basicInputProps()}
              />
            </S.Experience>
            <S.Name>Employment Type</S.Name>
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
                onChange={(value: any, name: any) => setFieldValue(name, value)}
              />
            </S.InputSelectWrapper>
            <S.Name>Hours per week</S.Name>
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
            <S.Name>Salary</S.Name>
            <S.Sku>
              Please note: don't use a decimal separator e.g. 3500 instead of
              3.500.
            </S.Sku>
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
            <S.SubTitle>3 Contact information for candidates</S.SubTitle>
            <S.RowWithTwoCells>
              <div>
                <S.Name>Name</S.Name>
                <S.Sku>
                  Leave a contact name (or general company info), so that your
                  job can be properly placed on job boards that require this
                  information.
                </S.Sku>
                <TextField
                  name="contactName"
                  // label="https://careers.company.com/job"
                  value={values!.contactName}
                  errors={fieldErrors!.contactInfoName}
                  {...basicInputProps()}
                />
              </div>
              <div>
                <S.Name>Phone number</S.Name>
                <S.Sku>
                  Some channels require a phone number to post a job. Leave a
                  contact person phone number or a general company number.
                </S.Sku>
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
            {/* <button type="submit">Submit</button> */}
          </S.RowWithOneCell>
        </S.Wrapper>
      </S.JobForm>
    </form>
  );
};
