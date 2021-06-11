/* eslint-disable no-console */
import { useCheckout } from "@saleor/sdk";
import { Formik } from "formik";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { CheckoutMetadataTypes } from "@app/CheckoutUtils/constants";
import { findOptionByField } from "@app/CheckoutUtils/helpers";
import * as CheckoutStyle from "@app/CheckoutUtils/styles";
import {
  MetadataInput,
  TypedMetadataUpdateMutation,
} from "@app/CheckoutUtils/updateMetadata";
import { Loader } from "@components/atoms";
import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";

import { CheckoutStep } from "../../../pages/CheckoutPage/utils";
import {
  EducationOptions,
  IndustryOptions,
  SeniorityOptions,
} from "./constants";
import { SetTargetGroupContent } from "./SetTargetGroupContent";

export interface ISetTargetGroupProps {
  changeSubmitProgress: any;
  onSubmitSuccess: any;
}
interface JobCategory {
  id: number;
  name: string;
  children?: Array<JobCategory>;
}

interface FormValues {
  jobFunction: any;
  seniority: any;
  industry: any;
  education: any;
}

export const SetTargetGroup: React.FC<ISetTargetGroupProps> = forwardRef(
  ({ changeSubmitProgress, onSubmitSuccess }, ref) => {
    const checkoutSetTargetGroupFormId = "set-target-group";
    const checkoutSetTargetGroupFormRef = useRef<HTMLFormElement>(null);
    const { checkout } = useCheckout();
    const { metadata, appendMetadata } = useCheckoutMetadata();
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const JOB_FUNCTION_API_URL =
      "https://pkb.web-production.vonq-aws.com/job-functions";

    const [jobFunctionList, setJobFunctionList] = useState<JobCategory[]>([]);

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

    useImperativeHandle(ref, () => () => {
      checkoutSetTargetGroupFormRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    });

    if (!checkout?.id || loading) {
      return <Loader />;
    }

    const initialValues: FormValues = {
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
      industry:
        metadata &&
        findOptionByField(
          IndustryOptions,
          metadata[CheckoutMetadataTypes.Industry],
          "id"
        ),
      education:
        metadata &&
        findOptionByField(
          EducationOptions,
          metadata[CheckoutMetadataTypes.EducationLevel],
          "id"
        ),
    };

    return (
      <>
        <CheckoutStyle.Title>Set target group</CheckoutStyle.Title>
        <CheckoutStyle.Desc>
          Fill in the needed information for your job posting(s). Some fields
          are required by job boards to be able to post on it.
        </CheckoutStyle.Desc>
        <TypedMetadataUpdateMutation
          onCompleted={data => {
            const newMetadata = {};
            const updateMetadata = data?.updateMetadata;
            setErrors(updateMetadata?.metadataErrors || []);
            if (updateMetadata?.metadataErrors?.length) {
              return;
            }
            const newData =
              updateMetadata?.item?.metadata.map(
                ({ key, value }: MetadataInput) => ({
                  [key]: value,
                })
              ) || [];
            Object.assign(newMetadata, ...newData);
            appendMetadata(newMetadata);
            onSubmitSuccess(CheckoutStep.Address);
          }}
          onError={error => {
            console.log(error, "error from on Error");
          }}
        >
          {(mutation, { loading, data }) => {
            return (
              <Formik
                initialValues={initialValues}
                onSubmit={(
                  { jobFunction, seniority, industry, education },
                  actions
                ) => {
                  actions.setSubmitting(false);
                  mutation({
                    variables: {
                      id: checkout?.id || "",
                      metadata: [
                        {
                          key: CheckoutMetadataTypes.JobFunction,
                          value: jobFunction?.id || "",
                        },
                        {
                          key: CheckoutMetadataTypes.Seniority,
                          value: seniority?.id || "",
                        },
                        {
                          key: CheckoutMetadataTypes.Industry,
                          value: industry?.id || "",
                        },
                        {
                          key: CheckoutMetadataTypes.EducationLevel,
                          value: education?.id || "",
                        },
                        {
                          key: CheckoutMetadataTypes.CompanyLogo,
                          value: "https://www.realtor.com/realtor-com.png",
                        },
                        {
                          key: CheckoutMetadataTypes.OrganizationName,
                          value: "organization test",
                        },
                        {
                          key: CheckoutMetadataTypes.TrackingUtm,
                          value: "tracking utm test",
                        },
                      ],
                    },
                  });
                }}
              >
                {({
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  values,
                  setFieldValue,
                  setFieldTouched,
                }) => (
                  <SetTargetGroupContent
                    {...{
                      errors,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      values,
                      jobFunctionList,
                      setFieldValue,
                      setFieldTouched,
                      checkoutSetTargetGroupFormId,
                      checkoutSetTargetGroupFormRef,
                    }}
                  />
                )}
              </Formik>
            );
          }}
        </TypedMetadataUpdateMutation>
      </>
    );
  }
);
SetTargetGroup.displayName = "SetTargetGroup";
export default SetTargetGroup;
