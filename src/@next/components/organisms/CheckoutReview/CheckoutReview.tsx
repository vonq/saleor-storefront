import React from "react";
import { FormattedMessage } from "react-intl";

import { CheckoutMetadataTypes } from "@app/CheckoutUtils/constants";
import { findOptionById } from "@app/CheckoutUtils/helpers";
import { useCheckoutMetadata } from "@hooks/useCheckoutMetadata";
// import { ErrorMessage } from "@components/atoms";
// import { AddressSummary } from "@components/molecules";
import { checkoutMessages } from "@temp/intl";

import {
  EducationOptions,
  IndustryOptions,
  JobFunctionOptions,
} from "../SetTargetGroup/constants";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Review order view showed in checkout.
 */
const CheckoutReview: React.FC<IProps> = ({
  shippingAddress,
  billingAddress,
  shippingMethodName,
  paymentMethodName,
  email,
  errors,
}) => {
  const { metadata } = useCheckoutMetadata();
  const jobData = {
    title:
      metadata &&
      findOptionById(
        JobFunctionOptions,
        metadata[CheckoutMetadataTypes.JobFunction]
      )?.name,
    industry:
      metadata &&
      findOptionById(IndustryOptions, metadata[CheckoutMetadataTypes.Industry])
        ?.name,
    education:
      metadata &&
      findOptionById(
        EducationOptions,
        metadata[CheckoutMetadataTypes.EducationLevel]
      )?.name,
    jobDescription: metadata && metadata[CheckoutMetadataTypes.JobDescription],
    linkToJobDetailPage: metadata && metadata[CheckoutMetadataTypes.VacancyURL],
    linkToJobAppPage:
      metadata && metadata[CheckoutMetadataTypes.ApplicationURL],
    expYear: metadata && metadata[CheckoutMetadataTypes.MinExp],
    minWorkingHour: metadata && metadata[CheckoutMetadataTypes.MinWorkingHours],
    maxWorkingHour: metadata && metadata[CheckoutMetadataTypes.MaxWorkingHours],
    minSalary: metadata && metadata[CheckoutMetadataTypes.SalaryMinAmount],
    maxSalary: metadata && metadata[CheckoutMetadataTypes.SalaryMaxAmount],
    contactInfoName: metadata && metadata[CheckoutMetadataTypes.ContactName],
    contactPhone: metadata && metadata[CheckoutMetadataTypes.ContactNumber],
    currency: metadata && metadata[CheckoutMetadataTypes.SalaryCurrency],
    period: metadata && metadata[CheckoutMetadataTypes.SalaryPerPeriod],
    employmentType: metadata && metadata[CheckoutMetadataTypes.VacancyType],
  };
  return (
    <S.Wrapper data-test="sectionTitle">
      <S.Title data-test="checkoutPageSubtitle">
        <FormattedMessage {...checkoutMessages.reviewOrder} />
      </S.Title>
      <S.ReviewCard>
        <p>{`Job title: ${jobData.title}`}</p>
        <p>{`Industry: ${jobData.industry}`}</p>
        <p>{`Education: ${jobData.education}`}</p>
        <p>{`Experiance: ${jobData.expYear} ${
          jobData.expYear === 1 ? "year" : "years"
        }`}</p>
        <p>{`Hours per week: ${jobData.minWorkingHour} - ${jobData.maxWorkingHour}`}</p>
        <p>{`Salary: ${jobData.minSalary} - ${jobData.maxSalary} ${jobData.currency} ${jobData.period}`}</p>
        <p>{`Employment type: ${jobData.employmentType}`}</p>
        <p>{`Contacts: ${jobData.contactInfoName} ${jobData.contactPhone}`}</p>
        <p>
          Job detail page:{" "}
          <S.ReviewLink
            href={jobData.linkToJobDetailPage}
          >{`${jobData.linkToJobDetailPage}`}</S.ReviewLink>
        </p>
        <p>
          Job application page:{" "}
          <S.ReviewLink
            href={jobData.linkToJobAppPage}
          >{`${jobData.linkToJobAppPage}`}</S.ReviewLink>
        </p>
      </S.ReviewCard>
      {/* <S.Grid>
        <section data-test="shippingAddressSection">
          <S.SubTitle>
            <FormattedMessage {...checkoutMessages.shippingAddress} />
          </S.SubTitle>
          <S.Divider />
          <AddressSummary address={shippingAddress} email={email} />
        </section>
        <section data-test="billingAddressSection">
          <S.SubTitle>
            <FormattedMessage defaultMessage="Billing Address" />
          </S.SubTitle>
          <S.Divider />
          <AddressSummary address={billingAddress} email={email} />
        </section>
        <section>
          <S.SubTitle>
            <FormattedMessage defaultMessage="Shipping Method" />
          </S.SubTitle>
          <S.Divider />
          <S.TextSummary data-test="shippingMethodName">
            {shippingMethodName}
          </S.TextSummary>
        </section>
        <section>
          <S.SubTitle>
            <FormattedMessage defaultMessage="Payment Method" />
          </S.SubTitle>
          <S.Divider />
          <S.TextSummary data-test="paymentMethodName">
            {paymentMethodName}
          </S.TextSummary>
        </section>
      </S.Grid>
      <S.ErrorMessages>
        <ErrorMessage errors={errors} />
      </S.ErrorMessages> */}
    </S.Wrapper>
  );
};

export { CheckoutReview };
