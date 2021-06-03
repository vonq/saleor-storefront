import React from "react";
import { FormattedMessage } from "react-intl";

// import { ErrorMessage } from "@components/atoms";
// import { AddressSummary } from "@components/molecules";
import { checkoutMessages } from "@temp/intl";

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
  const jobData = {
    title: "",
    industry: "",
    education: "",
    jobDescription: "",
    linkToJobDetailPage: "",
    linkToJobAppPage: "",
    expYear: 1,
    hoursPerWeek: [],
    salaryInterval: "",
    contactInfoName: "",
    contactPhone: "",
    currency: "",
    period: "",
    employmentType: "",
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
        <p>{`Hours per week: ${jobData.hoursPerWeek[0]} - ${jobData.hoursPerWeek[1]}`}</p>
        <p>{`Salary: ${jobData.salaryInterval[0]} - ${jobData.salaryInterval[1]} ${jobData.currency} ${jobData.period}`}</p>
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
