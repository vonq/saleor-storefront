import {
  Box,
  FormControl,
  FormHelperText,
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

const JobCriteriaForm = ({
  metaErrors,
  metadataValues,
  setMetaFieldData,
}: {
  metaErrors: any;
  metadataValues: any;
  setMetaFieldData: Function;
}) => {
  const classes = useStyles();

  return (
    <JobAdStepContainer>
      <JobStepNumber number={2} title="Job criteria" />
      {/* Min Education Level */}
      <JobPostingFieldContainer title="Minimum level of education">
        <FormControl
          variant="outlined"
          error={metaErrors?.vacancyEducationlevelid}
        >
          <Select
            value={metadataValues?.education}
            defaultValue=""
            onChange={e => {
              setMetaFieldData("education", e.target.value);
            }}
            displayEmpty
          >
            {EducationOptions.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {metaErrors?.vacancyEducationlevelid && (
            <FormHelperText>
              {metaErrors.vacancyEducationlevelid}
            </FormHelperText>
          )}
        </FormControl>
      </JobPostingFieldContainer>
      {/* Employment Type */}
      <JobPostingFieldContainer title="Employment Type">
        <FormControl variant="outlined" error={metaErrors?.vacancyType}>
          <Select
            value={metadataValues?.employmentType}
            defaultValue=""
            onChange={e => {
              setMetaFieldData("employmentType", e.target.value);
            }}
            displayEmpty
          >
            {employmentTypes.map(option => (
              <MenuItem key={option.enum} value={option.enum}>
                {option.type}
              </MenuItem>
            ))}
          </Select>
          {metaErrors?.vacancyType && (
            <FormHelperText>{metaErrors.vacancyType}</FormHelperText>
          )}
        </FormControl>
      </JobPostingFieldContainer>
      {/* Seniority */}
      <JobPostingFieldContainer title="Seniority">
        <FormControl
          variant="outlined"
          error={metaErrors?.vacancyTaxonomySeniorityid}
        >
          <Select
            value={metadataValues?.seniority}
            defaultValue=""
            onChange={e => {
              setMetaFieldData("seniority", e.target.value);
            }}
            displayEmpty
          >
            {SeniorityOptions.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {metaErrors?.vacancyTaxonomySeniorityid && (
            <FormHelperText>
              {metaErrors.vacancyTaxonomySeniorityid}
            </FormHelperText>
          )}
        </FormControl>
      </JobPostingFieldContainer>
      {/* Hours per week */}
      <JobPostingFieldContainer title="Hours per week">
        <Box className={classes.multiItemRow}>
          {/* Min Hours */}
          <Typography
            variant="body2"
            component="label"
            className={classes.label}
          >
            Min.
          </Typography>
          <TextField
            variant="outlined"
            type="number"
            defaultValue=""
            value={metadataValues?.minHours}
            onChange={e => setMetaFieldData("minHours", e.target.value)}
            error={metaErrors?.vacancyWorkinghoursMinimum}
            helperText={metaErrors?.vacancyWorkinghoursMinimum}
          />
          {/* Max Hours */}
          <Typography
            variant="body2"
            component="label"
            className={classes.label}
          >
            Max.
          </Typography>
          <TextField
            variant="outlined"
            type="number"
            defaultValue=""
            value={metadataValues?.maxHours}
            onChange={e => setMetaFieldData("maxHours", e.target.value)}
            error={metaErrors?.vacancyWorkinghoursMaximum}
            helperText={metaErrors?.vacancyWorkinghoursMaximum}
          />
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
          <TextField
            variant="outlined"
            type="number"
            defaultValue=""
            value={metadataValues?.minSalary}
            onChange={e => setMetaFieldData("minSalary", e.target.value)}
            error={metaErrors?.vacancySalaryMinimumamount}
            helperText={metaErrors?.vacancySalaryMinimumamount}
          />
          {/* Salary To */}
          <Typography
            variant="body2"
            component="label"
            className={classes.label}
          >
            To
          </Typography>
          <TextField
            variant="outlined"
            type="number"
            defaultValue=""
            value={metadataValues?.maxSalary}
            onChange={e => setMetaFieldData("maxSalary", e.target.value)}
            error={metaErrors?.vacancySalaryMaximumamount}
            helperText={metaErrors?.vacancySalaryMaximumamount}
          />
          {/* Currency */}
          <Typography
            variant="body2"
            component="label"
            className={classes.label}
          >
            In the currency
          </Typography>
          <FormControl
            variant="outlined"
            error={metaErrors?.vacancySalaryCurrency}
          >
            <Select
              value={metadataValues?.currency}
              defaultValue=""
              onChange={e => {
                setMetaFieldData("currency", e.target.value);
              }}
              displayEmpty
            >
              {currencies.map(option => (
                <MenuItem key={option.enum} value={option.enum}>
                  {option.currency}
                </MenuItem>
              ))}
            </Select>
            {metaErrors?.vacancySalaryCurrency && (
              <FormHelperText>
                {metaErrors.vacancySalaryCurrency}
              </FormHelperText>
            )}
          </FormControl>
          {/* Period */}
          <Typography variant="body2" component="label">
            Period
          </Typography>
          <FormControl
            variant="outlined"
            error={metaErrors?.vacancySalaryPerperiod}
          >
            <Select
              value={metadataValues?.period}
              defaultValue=""
              onChange={e => {
                setMetaFieldData("period", e.target.value);
              }}
              displayEmpty
            >
              {periods.map(option => (
                <MenuItem key={option.enum} value={option.enum}>
                  {option.period}
                </MenuItem>
              ))}
            </Select>
            {metaErrors?.vacancySalaryPerperiod && (
              <FormHelperText>
                {metaErrors.vacancySalaryPerperiod}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      </JobPostingFieldContainer>
    </JobAdStepContainer>
  );
};

export default JobCriteriaForm;
