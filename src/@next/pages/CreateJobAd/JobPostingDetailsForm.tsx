import {
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useCheckout } from "@saleor/sdk";
import React, { useEffect, useMemo, useState } from "react";

import { CheckoutMetadataTypes } from "@app/CheckoutUtils/constants";
import { findOptionByField } from "@app/CheckoutUtils/helpers";
import { Loader } from "@components/atoms";
import {
  currencies,
  employmentTypes,
  periods,
} from "@components/organisms/CreateJobAd/constants";
import {
  EducationOptions,
  IndustryOptions,
  SeniorityOptions,
} from "@components/organisms/SetTargetGroup/constants";
import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";
import JobAdStepContainer from "@pages/CreateJobAd/JobAdStepContainer";
import JobPostingFieldContainer from "@pages/CreateJobAd/JobPostingFieldContainer";
import JobStepNumber from "@pages/CreateJobAd/JobStepNumber";

interface JobCategory {
  id: number;
  name: string;
  children?: Array<JobCategory>;
}

const JobPostingDetailsForm = () => {
  const { checkout } = useCheckout();
  const { metadata, setMetadataField } = useCheckoutMetadata();

  const JOB_FUNCTION_API_URL =
    "https://pkb.web-production.vonq-aws.com/job-functions";

  const [jobFunctionList, setJobFunctionList] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobList = async () => {
      setLoading(true);
      const headers = new Headers();
      headers.set("Authorization", "Basic dm9ucV9wa2I6UHIwZFBrYlZvbnEyMDIx");

      const response = await fetch(JOB_FUNCTION_API_URL, {
        method: "GET",
        headers,
      });
      const jobFunctionMap = new Map();
      const res = await response.json();
      const collectJobList = (job: JobCategory) => {
        if (!jobFunctionMap.has(job.id)) {
          jobFunctionMap.set(job.id, job.name);
        }
        if (!job?.children || !job.children.length) {
          return;
        }
        const { children } = job;
        children.forEach((childJob: JobCategory) => {
          if (!jobFunctionMap.has(childJob.id)) {
            jobFunctionMap.set(childJob.id, childJob.name);
          }
          collectJobList(childJob);
        });
      };
      res.forEach((job: JobCategory) => {
        collectJobList(job);
      });
      const jobList = Array.from(jobFunctionMap, ([name, value]) => ({
        id: name,
        name: value,
      }));
      setJobFunctionList(jobList);
      setLoading(false);
    };
    if (!jobFunctionList || !jobFunctionList.length) {
      fetchJobList();
    }
  }, []);

  if (!checkout?.id || loading) {
    return <Loader />;
  }

  const values = {
    jobTitle: metadata && metadata[CheckoutMetadataTypes.JobTitle],
    jobDescription: metadata && metadata[CheckoutMetadataTypes.JobDescription],
    jobDetailLink: metadata && metadata[CheckoutMetadataTypes.VacancyURL],
    applicationLink: metadata && metadata[CheckoutMetadataTypes.ApplicationURL],
    jobExperience: metadata && metadata[CheckoutMetadataTypes.MinExp],
    employmentType:
      metadata &&
      findOptionByField(
        employmentTypes,
        metadata[CheckoutMetadataTypes.VacancyType],
        "enum"
      ),
    minHours: metadata && metadata[CheckoutMetadataTypes.MinWorkingHours],
    maxHours: metadata && metadata[CheckoutMetadataTypes.MaxWorkingHours],
    minSalary: metadata && metadata[CheckoutMetadataTypes.SalaryMinAmount],
    maxSalary: metadata && metadata[CheckoutMetadataTypes.SalaryMaxAmount],
    currency:
      metadata &&
      findOptionByField(
        currencies,
        metadata[CheckoutMetadataTypes.SalaryCurrency],
        "enum"
      ),
    period:
      metadata &&
      findOptionByField(
        periods,
        metadata[CheckoutMetadataTypes.SalaryPerPeriod],
        "enum"
      ),
    contactName: metadata && metadata[CheckoutMetadataTypes.ContactName],
    contactPhone: metadata && metadata[CheckoutMetadataTypes.ContactNumber],
    jobFunction:
      metadata &&
      findOptionByField(
        jobFunctionList,
        metadata[CheckoutMetadataTypes.JobFunction],
        "id"
      ),
    seniority:
      metadata &&
      findOptionByField(
        SeniorityOptions,
        metadata[CheckoutMetadataTypes.Seniority],
        "id"
      ),
    industry: metadata && metadata[CheckoutMetadataTypes.Industry],
    education:
      metadata &&
      findOptionByField(
        EducationOptions,
        metadata[CheckoutMetadataTypes.EducationLevel],
        "id"
      ),
  };

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
          // error
          // helperText="error test"
          value={values.jobTitle}
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
      {/* Job Industry */}
      <JobPostingFieldContainer
        title="Industry"
        description="Please fill in the industry of the job."
      >
        <FormControl variant="outlined" error>
          <Select
            value={values.industry}
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
    </JobAdStepContainer>
  );
};

export default JobPostingDetailsForm;
