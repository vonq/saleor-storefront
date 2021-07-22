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

import { IndustryOptions } from "@components/organisms/SetTargetGroup/constants";
import JobPostingFieldContainer from "@pages/CreateJobAd/JobPostingFieldContainer";
import JobStepNumber from "@pages/CreateJobAd/JobStepNumber";

const JobPostingDetailsForm = () => {
  return (
    <>
      <JobStepNumber number={1} title="Job posting details" />
      {/* Job Title */}
      <JobPostingFieldContainer
        title="Job title"
        description="This is the job title which will be shown to your candidates:"
      >
        <TextField
          variant="outlined"
          error
          helperText="error test"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EditOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </JobPostingFieldContainer>
      {/* Job Industry */}
      <JobPostingFieldContainer
        title="Industry"
        description="Please fill in the industry of the job."
      >
        <FormControl variant="outlined" error>
          <Select value="" onChange={() => {}} displayEmpty>
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
          <Select value="" onChange={() => {}} displayEmpty>
            {IndustryOptions.map(industry => (
              <MenuItem key={industry.id} value={industry.id}>
                {industry.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </JobPostingFieldContainer>
      {/* Link to job detail page */}
      <JobPostingFieldContainer
        title="Link to job detail page"
        description="Fill in the URL that will be used as the landing page for your job ads."
      >
        <TextField
          variant="outlined"
          error
          helperText="Please fill in the full URL address, with http(s)://."
        />
      </JobPostingFieldContainer>
      {/* Link to application page */}
      <JobPostingFieldContainer
        title="Link to application page"
        description="Fill in the URL of the page where a candidate fills in the application. Depending on your application process, this can also be the job detail page."
      >
        <TextField
          variant="outlined"
          helperText="Please fill in the full URL address, with http(s)://."
        />
      </JobPostingFieldContainer>
    </>
  );
};

export default JobPostingDetailsForm;
