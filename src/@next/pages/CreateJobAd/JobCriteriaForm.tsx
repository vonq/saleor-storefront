import { TextField } from "@material-ui/core";
import React from "react";

import JobAdSubTitleHeader from "./JobAdSubTitleHeader";
import JobStepNumber from "./JobStepNumber";

const JobCriteriaForm = () => {
  return (
    <>
      <JobStepNumber number={2} title="Job criteria" />
      {/* Job Title */}
      <JobAdSubTitleHeader title="Minimum level of education">
        <TextField variant="outlined" error helperText="error test" />
      </JobAdSubTitleHeader>
    </>
  );
};

export default JobCriteriaForm;
