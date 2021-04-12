/* eslint-disable prettier/prettier */
import gql from "graphql-tag";

import { TypedMutation } from "../../../../core/mutations";
import { CampaignType } from "../SetTargetGroup/queries";

const jobInfoCreate = gql`
  mutation JobInfoCreate(
    $campaign: ID!
    $title: String!
    $seniority: SeniorityEnum!
    $industry: IndustryEnum!
    $education: EducationLeavelEnum!
    $jobDescription: String!
    $linkToJobDetailPage: String!
    $linkToJobAppPage: String!
    $expYear: Int!
    $hoursPerWeek: [Int]!
    $salaryInterval: [Int]!
    $contactInfoName: String!
    $contactPhone: String!
    $currency: CurrenciesEnum!
    $period: PeriodEnum!
    $employmentType: EmploymentTypeEnum!
  ) {
    jobInfoCreate (
      input: {
        campaign: $campaign,
        title: $title,
        seniority: $seniority,
        industry: $industry,
        education: $education,
        jobDescription: $jobDescription,
        linkToJobDetailPage: $linkToJobDetailPage,
        linkToJobAppPage: $linkToJobAppPage,
        expYear: $expYear,
        hoursPerWeek: $hoursPerWeek,
        salaryInterval: $salaryInterval,
        contactInfoName: $contactInfoName,
        contactPhone: $contactPhone,
        currency: $currency,
        period: $period,
        employmentType: $employmentType
      }
    ) {
      jobInfo {
        id
        created
        title
        industry
        education
        jobDescription
        linkToJobDetailPage
        linkToJobAppPage
        expYear
        hoursPerWeek
        salaryInterval
        contactInfoName
        contactPhone
        currency
        period
        employmentType
      }
    }
  }
`;

enum PeriodEnum {
  MONTHLY,
  YEARLY,
}

enum CurrenciesEnum {
  AFN,
  ARS,
  AWG,
  AUD,
  AZN,
  BSD,
  BBD,
  BDT,
  BYR,
  BZD,
  BMD,
  BOB,
  BAM,
  BWP,
  BGN,
  BRL,
  BND,
  KHR,
  CAD,
  KYD,
  CLP,
  CNY,
  COP,
  CRC,
  HRK,
  CUP,
  CZK,
  DKK,
  DOP,
  XCD,
  EGP,
  SVC,
  EEK,
  EUR,
  FKP,
  FJD,
  GHC,
  GIP,
  GTQ,
  GGP,
  GYD,
  HNL,
  HKD,
  HUF,
  ISK,
  INR,
  IDR,
  IRR,
  IMP,
  ILS,
  JMD,
  JPY,
  JEP,
  KZT,
  KPW,
  KRW,
  KGS,
  LAK,
  LVL,
  LBP,
  LRD,
  LTL,
  MKD,
  MYR,
  MUR,
  MXN,
  MNT,
  MZN,
  NAD,
  NPR,
  ANG,
  NZD,
  NIO,
  NGN,
  NOK,
  OMR,
  PKR,
  PAB,
  PYG,
  PEN,
  PHP,
  PLN,
  QAR,
  RON,
  RUB,
  SHP,
  SAR,
  RSD,
  SCR,
  SGD,
  SBD,
  SOS,
  ZAR,
  LKR,
  SEK,
  CHF,
  SRD,
  SYP,
  TWD,
  THB,
  TTD,
  TRY,
  TRL,
  TVD,
  UAH,
  GBP,
  USD,
  UYU,
  UZS,
  VEF,
  VND,
  YER,
  ZWD,
}

enum EmploymentTypeEnum {
  FIXED_TERM,
  FIXED_TERM_WITH_PERMAMENT,
  FREELANCE,
  INTERSHIP,
  PERMAMENT,
  TRAINEESHIP,
}

type JobInfoType = {
  id: String;
  created: any;
  title: String;
  campaign: CampaignType;
  industry: String;
  jobDescription: String;
  linkToJobDetailPage: String;
  linkToJobAppPage: String;
  expYear: Number;
  education: String;
  employmentType: String;
  hoursPerWeek: [Number];
  salaryInterval: [Number];
  currency: String;
  period: String;
  contactInfoName: String;
  contactPhone: String;
};

export interface JobInfoCreate {
  jobInfoCreate: any;
  jobInfo: JobInfoType;
}

export interface JobInfoCreateVariables {
  campaign: string;
  jobDescription: string;
  linkToJobDetailPage: string;
  linkToJobAppPage: string;
  expYear: string;
  hoursPerWeek: any;
  salaryInterval: any;
  contactInfoName: string;
  contactPhone: string;
  currency: CurrenciesEnum;
  period: PeriodEnum;
  employmentType: EmploymentTypeEnum;
  title: string;
  seniority: string;
  industry: string;
  education: string;
}

export const TypedJobInfoCreateMutation = TypedMutation<
  JobInfoCreate,
  JobInfoCreateVariables
>(jobInfoCreate);
