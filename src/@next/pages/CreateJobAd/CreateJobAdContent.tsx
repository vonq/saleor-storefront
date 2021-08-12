import {
  Box,
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";

import JobCriteriaForm from "@pages/CreateJobAd/JobCriteriaForm";
import JobPostingDetailsForm, {
  JobCategory,
} from "@pages/CreateJobAd/JobPostingDetailsForm";
import { jobAdMessages } from "@temp/intl";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "1248px",
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
        <Grid item xs={12}>
          <Box className={classes.header}>
            <Typography variant="h4" component="h1">
              <FormattedMessage {...jobAdMessages.createJobAd} />
            </Typography>
            <Typography variant="body1" component="h6">
              <FormattedMessage {...jobAdMessages.createJobAdDescription} />
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
