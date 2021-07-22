import {
  Box,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
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
import JobAdStepContainer from "@pages/CreateJobAd/JobAdStepContainer";
import JobPostingFieldContainer from "@pages/CreateJobAd/JobPostingFieldContainer";
import JobStepNumber from "@pages/CreateJobAd/JobStepNumber";

const useStyles = makeStyles<Theme>(theme => ({
  multiItemRow: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));

const JobCriteriaForm = () => {
  const classes = useStyles();

  return (
    <JobAdStepContainer>
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
        <Box className={classes.multiItemRow}>
          {/* Min Salary */}
          <Typography
            variant="body2"
            component="label"
            className={classes.label}
          >
            Min.
          </Typography>
          <TextField variant="outlined" type="number" />
          {/* Max Salary */}
          <Typography
            variant="body2"
            component="label"
            className={classes.label}
          >
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
        <Box className={classes.multiItemRow}>
          {/* Salary From */}
          <Typography
            variant="body2"
            component="label"
            className={classes.label}
          >
            From
          </Typography>
          <TextField variant="outlined" type="number" />
          {/* Salary To */}
          <Typography
            variant="body2"
            component="label"
            className={classes.label}
          >
            To
          </Typography>
          <TextField variant="outlined" type="number" />
          {/* Currency */}
          <Typography
            variant="body2"
            component="label"
            className={classes.label}
          >
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
    </JobAdStepContainer>
  );
};

export default JobCriteriaForm;
