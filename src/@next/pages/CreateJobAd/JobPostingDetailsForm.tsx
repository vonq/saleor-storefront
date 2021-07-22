import {
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import React from "react";

import { CheckoutMetadataTypes } from "@app/CheckoutUtils/constants";
import { IndustryOptions } from "@components/organisms/SetTargetGroup/constants";
import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";
import JobAdStepContainer from "@pages/CreateJobAd/JobAdStepContainer";
import JobPostingFieldContainer from "@pages/CreateJobAd/JobPostingFieldContainer";
import JobStepNumber from "@pages/CreateJobAd/JobStepNumber";

export interface JobCategory {
  id: number;
  name: string;
  children?: Array<JobCategory>;
}

const JobPostingDetailsForm = ({
  jobFunctionList,
  metaErrors,
}: {
  jobFunctionList: Array<JobCategory>;
  metaErrors: any;
}) => {
  const { metadataValues, setMetadataField } = useCheckoutMetadata();

  console.log("+++ waiting errors here +++", metaErrors);

  return (
    <JobAdStepContainer>
      <JobStepNumber number={1} title="Job posting details" />
      {/* Job Title */}
      <JobPostingFieldContainer
        title="Job title"
        description="This is the job title which will be shown to your candidates:"
      >
        <TextField
          variant="outlined"
          error={metaErrors!.vacancyJobtitle}
          // helperText="error test"
          value={metadataValues.jobTitle}
          onChange={e => {
            setMetadataField(CheckoutMetadataTypes.JobTitle, e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EditOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </JobPostingFieldContainer>
      {/* Job Function */}
      <JobPostingFieldContainer title="Job Function">
        <FormControl variant="outlined" error>
          <Select
            value={metadataValues.jobFunction}
            defaultValue=""
            onChange={e => {
              setMetadataField(
                CheckoutMetadataTypes.JobFunction,
                e.target.value
              );
            }}
            displayEmpty
          >
            {jobFunctionList.map(job => (
              <MenuItem key={job.id} value={job.id}>
                {job.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>error</FormHelperText>
        </FormControl>
      </JobPostingFieldContainer>
      {/* Job Industry */}
      <JobPostingFieldContainer
        title="Industry"
        description="Please fill in the industry of the job."
      >
        <FormControl variant="outlined" error>
          <Select
            value={metadataValues.industry}
            defaultValue=""
            onChange={e => {
              setMetadataField(CheckoutMetadataTypes.Industry, e.target.value);
            }}
            displayEmpty
          >
            {IndustryOptions.map(industry => (
              <MenuItem key={industry.id} value={industry.id}>
                {industry.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>error</FormHelperText>
        </FormControl>
      </JobPostingFieldContainer>
      {/* Job Description */}
      <JobPostingFieldContainer
        title="Job description"
        description="Choose how you want to fill in your job description."
      >
        <FormControl variant="outlined">
          <TextField
            variant="outlined"
            value={metadataValues.jobDescription}
            onChange={e => {
              setMetadataField(
                CheckoutMetadataTypes.JobDescription,
                e.target.value
              );
            }}
          />
        </FormControl>
      </JobPostingFieldContainer>
      {/* Link to job detail page */}
      <JobPostingFieldContainer
        title="Link to job detail page"
        description="Fill in the URL that will be used as the landing page for your job ads."
      >
        <TextField
          variant="outlined"
          value={metadataValues.jobDetailLink}
          onChange={e => {
            setMetadataField(CheckoutMetadataTypes.VacancyURL, e.target.value);
          }}
          error={!!metaErrors?.vacancyTrackingVacancyUrl}
          helperText={metaErrors?.vacancyTrackingVacancyUrl || ""}
        />
      </JobPostingFieldContainer>
      {/* Link to application page */}
      <JobPostingFieldContainer
        title="Link to application page"
        description="Fill in the URL of the page where a candidate fills in the application. Depending on your application process, this can also be the job detail page."
      >
        <TextField
          variant="outlined"
          value={metadataValues.applicationLink}
          onChange={e => {
            setMetadataField(
              CheckoutMetadataTypes.ApplicationURL,
              e.target.value
            );
          }}
          helperText="Please fill in the full URL address, with http(s)://."
        />
      </JobPostingFieldContainer>
    </JobAdStepContainer>
  );
};

export default JobPostingDetailsForm;
