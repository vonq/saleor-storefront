import { JobCategory } from "@pages/CreateJobAd/JobPostingDetailsForm";

const JOB_FUNCTION_API_URL =
  "https://pkb.web-production.vonq-aws.com/job-functions";

export const fetchJobFunctionList = async () => {
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
  return Array.from(jobFunctionMap, ([name, value]) => ({
    id: name,
    name: value,
  }));
};
