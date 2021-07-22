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
  jobFunctionList,
  metaErrors,
}: {
  jobFunctionList: Array<JobCategory>;
  metaErrors: any;
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
            jobFunctionList={jobFunctionList}
            metaErrors={metaErrors}
          />
          <JobCriteriaForm metaErrors={metaErrors} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateJobAdContent;
