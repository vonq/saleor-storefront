import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

import {
  currencies,
  employmentTypes,
  periods,
} from "@components/organisms/CreateJobAd/constants";
import {
  EducationOptions,
  SeniorityOptions,
} from "@components/organisms/SetTargetGroup/constants";
import JobPostingFieldContainer from "@pages/CreateJobAd/JobPostingFieldContainer";
import JobStepNumber from "@pages/CreateJobAd/JobStepNumber";

const JobCriteriaForm = () => {
  return (
    <>
      <JobStepNumber number={2} title="Job criteria" />
      {/* Min Education Level */}
      <JobPostingFieldContainer title="Minimum level of education">
        <FormControl variant="outlined">
          <Select value="" onChange={() => {}} displayEmpty>
            {EducationOptions.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </JobPostingFieldContainer>
      {/* Employment Type */}
      <JobPostingFieldContainer title="Employment Type">
        <FormControl variant="outlined">
          <Select value="" onChange={() => {}} displayEmpty>
            {employmentTypes.map(option => (
              <MenuItem key={option.enum} value={option.enum}>
                {option.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </JobPostingFieldContainer>
      {/* Seniority */}
      <JobPostingFieldContainer title="Seniority">
        <FormControl variant="outlined">
          <Select value="" onChange={() => {}} displayEmpty>
            {SeniorityOptions.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </JobPostingFieldContainer>
      {/* Hours per week */}
      <JobPostingFieldContainer title="Hours per week">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Min Salary */}
          <Typography variant="body2" component="label">
            Min.
          </Typography>
          <TextField variant="outlined" type="number" />
          {/* Max Salary */}
          <Typography variant="body2" component="label">
            Max.
          </Typography>
          <TextField variant="outlined" type="number" />
        </Box>
      </JobPostingFieldContainer>
      {/* Salary */}
      <JobPostingFieldContainer
        title="Salary (optional)"
        description="Please note: don't use a decimal separator e.g. 3500 instead of 3.500."
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Salary From */}
          <Typography variant="body2" component="label">
            From
          </Typography>
          <TextField variant="outlined" type="number" />
          {/* Salary To */}
          <Typography variant="body2" component="label">
            To
          </Typography>
          <TextField variant="outlined" type="number" />
          {/* Currency */}
          <Typography variant="body2" component="label">
            In the currency
          </Typography>
          <FormControl variant="outlined">
            <Select value="" onChange={() => {}} displayEmpty>
              {currencies.map(option => (
                <MenuItem key={option.enum} value={option.enum}>
                  {option.currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Period */}
          <Typography variant="body2" component="label">
            Period
          </Typography>
          <FormControl variant="outlined">
            <Select value="" onChange={() => {}} displayEmpty>
              {periods.map(option => (
                <MenuItem key={option.enum} value={option.enum}>
                  {option.period}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </JobPostingFieldContainer>
    </>
  );
};

export default JobCriteriaForm;
