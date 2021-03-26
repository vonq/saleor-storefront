/* eslint-disable react/no-unescaped-entities */
// import { Editor } from "@tinymce/tinymce-react";
import { Editor } from "@tinymce/tinymce-react";
import { FieldArray, Form } from "formik";
import React, { useCallback, useState } from "react";

import { InputSelect, TextField } from "@components/molecules";

import {
  currencies,
  employmentTypes,
  industries,
  periods,
  senioritis,
} from "./constants";
import * as S from "./styles";

interface Props {
  handleChange?: any;
  handleSubmit?: any;
  handleBlur?: any;
  values?: any;
  setFieldValue?: any;
  setFieldTouched?: any;
}

export const CreateJobContent: React.FC<Props> = ({
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  setFieldValue,
  setFieldTouched,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  const [isChecked, setIsChecked] = useState(true);
  // console.log(handleChange);

  const educationLvl = [
    { value: "Bachelor / Graduate" },
    { value: "GCSE / A-Level / Highschool / GED" },
    { value: "Master / Post-Graduate / PhD" },
    { value: "Vocational / Diploma / Associates degree" },
  ];

  return (
    <Form>
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
              {...basicInputProps()}
            />
            <S.Name>Industry</S.Name>
            <S.Sku>Please fill in the industry of the job.</S.Sku>
            <InputSelect
              options={industries}
              optionLabelKey="industry"
              // placeholder="Select"
              label=""
              value=""
              name="industry"
              onChange={(value: any, name: any) => setFieldValue(name, value)}
            />
            <S.Label>
              <S.Radio
                type="radio"
                id="radio"
                name="text-editor"
                onClick={() => setIsChecked(prev => !prev)}
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
                onClick={() => setIsChecked(prev => !prev)}
                // onChange={e => setRadio(e.target.name)}
                checked={!isChecked}
              />
              Upload Pdf/Word
            </S.Label>
            {isChecked ? (
              <S.TextArea>
                <Editor
                  initialValue=""
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
                    // console.log("Content was updated:", content);
                    // console.log("editor:", editor);
                  }}
                />
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
              name="jobDatailLink"
              label="https://careers.company.com/job"
              value={values!.jobDatailLink}
              {...basicInputProps()}
            />
            <S.Name>Link to application page</S.Name>
            <S.Sku>
              Fill in the URL of the page where a candidate fills in the
              application. Depending on your application process, this can also
              be the job detail page.
            </S.Sku>
            <TextField
              name="aplicationLink"
              label="https://careers.company.com/job/apply"
              value={values!.aplicationLink}
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
                {...basicInputProps()}
              />
            </S.Experience>
            <S.Name>Level of education</S.Name>
            <S.CheckboxArea>
              <FieldArray
                name="educationLevel"
                render={arrayHelpers => (
                  <>
                    {educationLvl.map(level => (
                      // eslint-disable-next-line jsx-a11y/label-has-associated-control
                      <label key={level.value}>
                        <input
                          type="checkbox"
                          checked={values.educationLevel.includes(level.value)}
                          onChange={e => {
                            if (e.target.checked) {
                              arrayHelpers.push(level.value);
                            } else {
                              const idx = values.educationLevel.indexOf(
                                level.value
                              );
                              arrayHelpers.remove(idx);
                            }
                          }}
                        />
                        <S.CheckboxSpan>{`${level.value}`}</S.CheckboxSpan>
                      </label>
                    ))}
                  </>
                )}
              />
            </S.CheckboxArea>
            <S.Name>Employment Type</S.Name>
            <S.InputSelectWrapper>
              <InputSelect
                options={employmentTypes}
                optionLabelKey="type"
                // placeholder="Select"
                name="employmentType"
                label=""
                value=""
                onChange={(value: any, name: any) => setFieldValue(name, value)}
              />
            </S.InputSelectWrapper>
            <S.Name>Seniority</S.Name>
            <S.InputSelectWrapper>
              <InputSelect
                options={senioritis}
                optionLabelKey="seniority"
                // placeholder="Select"
                name="seniority"
                label=""
                value=""
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
                  onChange={event =>
                    setFieldValue(event.target.name, event.target.value)
                  }
                />
              </S.Label>
              <S.Label>
                Max.
                <S.Number
                  type="number"
                  min="1"
                  name="maxHours"
                  onChange={event =>
                    setFieldValue(event.target.name, event.target.value)
                  }
                />
              </S.Label>
            </S.Hours>
            <S.Name>Salary</S.Name>
            <S.Sku>
              Please note: don't use a decimal separator e.g. 3500 instead of
              3.500.
            </S.Sku>
            <S.Salary>
              <S.SalarySpan>From</S.SalarySpan>
              <S.SalaryInput
                type="number"
                placeholder="2500"
                min="1"
                name="minSalary"
                onChange={event =>
                  setFieldValue(event.target.name, event.target.value)
                }
              />
              <S.SalarySpan>To</S.SalarySpan>
              <S.SalaryInput
                type="number"
                placeholder="3500"
                name="maxSalary"
                onChange={event =>
                  setFieldValue(event.target.name, event.target.value)
                }
              />
              <S.SalarySpan>In the currency</S.SalarySpan>
              <S.SalaryCurrency>
                <InputSelect
                  options={currencies}
                  optionLabelKey="currency"
                  name="currency"
                  label=""
                  value=""
                  onChange={(value: any, name: any) =>
                    setFieldValue(name, value)
                  }
                />
              </S.SalaryCurrency>
              <S.SalarySpan>Period</S.SalarySpan>
              <S.SalaryPeriod>
                <InputSelect
                  options={periods}
                  optionLabelKey="period"
                  label=""
                  value=""
                  name="period"
                  onChange={(value: any, name: any) =>
                    setFieldValue(name, value)
                  }
                />
              </S.SalaryPeriod>
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
                  {...basicInputProps()}
                />
              </div>
            </S.RowWithTwoCells>
            <button type="submit">Submit</button>
          </S.RowWithOneCell>
        </S.Wrapper>
      </S.JobForm>
    </Form>
  );
};
