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
import { FormattedMessage } from "react-intl";

import { IndustryOptions } from "@components/organisms/SetTargetGroup/constants";
import JobAdStepContainer from "@pages/CreateJobAd/JobAdStepContainer";
import JobPostingFieldContainer from "@pages/CreateJobAd/JobPostingFieldContainer";
import JobStepNumber from "@pages/CreateJobAd/JobStepNumber";
import { jobAdMessages } from "@temp/intl";

export interface JobCategory {
  id: number;
  name: string;
  children?: Array<JobCategory>;
}

const JobPostingDetailsForm = ({
  metadataValues,
  jobFunctionList,
  metaErrors,
  setMetaFieldData,
}: {
  metadataValues: any;
  jobFunctionList: Array<JobCategory>;
  metaErrors: any;
  setMetaFieldData: Function;
}) => {
  return (
    <JobAdStepContainer>
      <JobStepNumber
        number={1}
        title={<FormattedMessage {...jobAdMessages.jobPostingDetails} />}
      />
      {/* Job Title */}
      <JobPostingFieldContainer
        title={<FormattedMessage {...jobAdMessages.jobTitle} />}
        description={
          <FormattedMessage {...jobAdMessages.jobTitleDescription} />
        }
      >
        <TextField
          variant="outlined"
          error={metaErrors?.vacancyJobtitle}
          helperText={metaErrors?.vacancyJobtitle}
          defaultValue=""
          value={metadataValues?.jobTitle}
          onChange={e => {
            setMetaFieldData("jobTitle", e.target.value);
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
      <JobPostingFieldContainer
        title={<FormattedMessage {...jobAdMessages.jobFunction} />}
      >
        <FormControl
          variant="outlined"
          error={metaErrors?.vacancyTaxonomyJobcategoryid}
        >
          <Select
            value={metadataValues?.jobFunction}
            defaultValue=""
            onChange={e => {
              setMetaFieldData("jobFunction", e.target.value);
            }}
            displayEmpty
          >
            {jobFunctionList.map(job => (
              <MenuItem key={job.id} value={job.id}>
                {job.name}
              </MenuItem>
            ))}
          </Select>
          {metaErrors?.vacancyTaxonomyJobcategoryid && (
            <FormHelperText>
              {metaErrors.vacancyTaxonomyJobcategoryid}
            </FormHelperText>
          )}
        </FormControl>
      </JobPostingFieldContainer>
      {/* Job Industry */}
      <JobPostingFieldContainer
        title={<FormattedMessage {...jobAdMessages.jobIndustry} />}
        description={
          <FormattedMessage {...jobAdMessages.jobIndustryDescription} />
        }
      >
        <FormControl
          variant="outlined"
          error={metaErrors?.vacancyTaxonomyIndustry}
        >
          <Select
            value={metadataValues?.industry}
            defaultValue=""
            onChange={e => {
              setMetaFieldData("industry", e.target.value);
            }}
            displayEmpty
          >
            {IndustryOptions.map(industry => (
              <MenuItem key={industry.id} value={industry.id}>
                {industry.name}
              </MenuItem>
            ))}
          </Select>
          {metaErrors?.vacancyTaxonomyIndustry && (
            <FormHelperText>
              {metaErrors.vacancyTaxonomyIndustry}
            </FormHelperText>
          )}
        </FormControl>
      </JobPostingFieldContainer>
      {/* Job Description */}
      <JobPostingFieldContainer
        title={<FormattedMessage {...jobAdMessages.jobDescription} />}
        description={
          <FormattedMessage {...jobAdMessages.jobDescriptionSummary} />
        }
      >
        <FormControl variant="outlined">
          <TextField
            variant="outlined"
            defaultValue=""
            value={metadataValues?.jobDescription}
            error={metaErrors?.vacancyDescription}
            helperText={metaErrors?.vacancyDescription}
            onChange={e => {
              setMetaFieldData("jobDescription", e.target.value);
            }}
          />
        </FormControl>
      </JobPostingFieldContainer>
      {/* Link to job detail page */}
      <JobPostingFieldContainer
        title={<FormattedMessage {...jobAdMessages.jobDetailPageUrl} />}
        description={
          <FormattedMessage {...jobAdMessages.jobDetailPageUrlDescription} />
        }
      >
        <TextField
          variant="outlined"
          defaultValue=""
          value={metadataValues?.jobDetailLink}
          onChange={e => {
            setMetaFieldData("jobDetailLink", e.target.value);
          }}
          error={!!metaErrors?.vacancyTrackingVacancyUrl}
          helperText={metaErrors?.vacancyTrackingVacancyUrl}
        />
      </JobPostingFieldContainer>
      {/* Link to application page */}
      <JobPostingFieldContainer
        title={<FormattedMessage {...jobAdMessages.jobApplicationPageUrl} />}
        description={
          <FormattedMessage
            {...jobAdMessages.jobApplicationPageUrlDescription}
          />
        }
      >
        <TextField
          variant="outlined"
          defaultValue=""
          value={metadataValues?.applicationLink}
          onChange={e => {
            setMetaFieldData("applicationLink", e.target.value);
          }}
          error={metaErrors?.vacancyTrackingApplicationurl}
          helperText={metaErrors?.vacancyTrackingApplicationurl}
        />
      </JobPostingFieldContainer>
    </JobAdStepContainer>
  );
};

export default JobPostingDetailsForm;
