import {
  Box,
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";

import JobCriteriaForm from "@pages/CreateJobAd/JobCriteriaForm";
import JobPostingDetailsForm, {
  JobCategory,
} from "@pages/CreateJobAd/JobPostingDetailsForm";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  header: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
}));

const CreateJobAdContent = ({
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
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={8}>
          <Box className={classes.header}>
            <Typography variant="h4" component="h1">
              Create your job ad(s)
            </Typography>
            <Typography variant="body1" component="h6">
              Fill in the needed information for your job posting(s). Some
              fields are required by job boards to be able to post on it.
            </Typography>
          </Box>
          <JobPostingDetailsForm
            metadataValues={metadataValues}
            jobFunctionList={jobFunctionList}
            metaErrors={metaErrors}
            setMetaFieldData={setMetaFieldData}
          />
          <JobCriteriaForm
            metaErrors={metaErrors}
            metadataValues={metadataValues}
            setMetaFieldData={setMetaFieldData}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateJobAdContent;
