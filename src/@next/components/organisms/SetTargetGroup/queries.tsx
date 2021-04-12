/* eslint-disable prettier/prettier */
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";
// import { CountryCode } from "gqlTypes/globalTypes";
import gql from "graphql-tag";

import { TypedMutation } from "../../../../core/mutations";

const campaingCreate = gql`
  mutation CampaingCreate(
    $title: String!
    $jobFunction: String!
    $country: CountryCode!
    $seniority: SeniorityEnum!
    $industry: IndustryEnum!
    $education: EducationLeavelEnum!
  ) {
    campaignCreate(
      input: {
        title: $title,
        jobFunction: $jobFunction,
        country: $country,
        seniority: $seniority,
        industry: $industry,
        education: $education
      }
    ) {
      campaignErrors {
        message
      }
      campaign {
        title
        id
        user {
          id
        }
      }
    }
  }
`;

enum CampaignCountry {
  AF,
  AX,
  AL,
  DZ,
  AS,
  AD,
  AO,
  AI,
  AQ,
  AG,
  AR,
  AM,
  AW,
  AU,
  AT,
  AZ,
  BS,
  BH,
  BD,
  BB,
  BY,
  BE,
  BZ,
  BJ,
  BM,
  BT,
  BO,
  BQ,
  BA,
  BW,
  BV,
  BR,
  IO,
  BN,
  BG,
  BF,
  BI,
  CV,
  KH,
  CM,
  CA,
  KY,
  CF,
  TD,
  CL,
  CN,
  CX,
  CC,
  CO,
  KM,
  CG,
  CD,
  CK,
  CR,
  CI,
  HR,
  CU,
  CW,
  CY,
  CZ,
  DK,
  DJ,
  DM,
  DO,
  EC,
  EG,
  SV,
  GQ,
  ER,
  EE,
  SZ,
  ET,
  EU,
  FK,
  FO,
  FJ,
  FI,
  FR,
  GF,
  PF,
  TF,
  GA,
  GM,
  GE,
  DE,
  GH,
  GI,
  GR,
  GL,
  GD,
  GP,
  GU,
  GT,
  GG,
  GN,
  GW,
  GY,
  HT,
  HM,
  VA,
  HN,
  HK,
  HU,
  IS,
  IN,
  ID,
  IR,
  IQ,
  IE,
  IM,
  IL,
  IT,
  JM,
  JP,
  JE,
  JO,
  KZ,
  KE,
  KI,
  KW,
  KG,
  LA,
  LV,
  LB,
  LS,
  LR,
  LY,
  LI,
  LT,
  LU,
  MO,
  MG,
  MW,
  MY,
  MV,
  ML,
  MT,
  MH,
  MQ,
  MR,
  MU,
  YT,
  MX,
  FM,
  MD,
  MC,
  MN,
  ME,
  MS,
  MA,
  MZ,
  MM,
  NA,
  NR,
  NP,
  NL,
  NC,
  NZ,
  NI,
  NE,
  NG,
  NU,
  NF,
  KP,
  MK,
  MP,
  NO,
  OM,
  PK,
  PW,
  PS,
  PA,
  PG,
  PY,
  PE,
  PH,
  PN,
  PL,
  PT,
  PR,
  QA,
  RE,
  RO,
  RU,
  RW,
  BL,
  SH,
  KN,
  LC,
  MF,
  PM,
  VC,
  WS,
  SM,
  ST,
  SA,
  SN,
  RS,
  SC,
  SL,
  SG,
  SX,
  SK,
  SI,
  SB,
  SO,
  ZA,
  GS,
  KR,
  SS,
  ES,
  LK,
  SD,
  SR,
  SJ,
  SE,
  CH,
  SY,
  TW,
  TJ,
  TZ,
  TH,
  TL,
  TG,
  TK,
  TO,
  TT,
  TN,
  TR,
  TM,
  TC,
  TV,
  UG,
  UA,
  AE,
  GB,
  UM,
  US,
  UY,
  UZ,
  VU,
  VE,
  VN,
  VG,
  VI,
  WF,
  EH,
  YE,
  ZM,
  ZW,
}

enum CampaignErrorCode {
  INVALID,
  DUPLICATED_INPUT_ITEM,
  GRAPHQL_ERROR,
  UNIQUE,
  REQUIRED,
}

type CampaignError = {
  field: String;
  message: String;
  code: CampaignErrorCode;
};

export type CampaignType = {
  title: String;
  country: CampaignCountry;
  industry: String;
  seniority: String;
  education: String;
  jobFunction: String;
  id: any;
  user: User;
};

export interface CampaignCreate {
  campaignCreate: any;
  data: any;
  campaignErrors: [CampaignError];
  campaign: CampaignType;
}

export interface CampaignCreateVariables {
  title: string;
  jobFunction: string;
  country: string;
  seniority: string;
  industry: string;
  education: string;
}

export interface RegisterAccountVariables {
  email: string;
  password: string;
  redirectUrl: string;
}

export const TypedCampaingCreateMutation = TypedMutation<
  CampaignCreate,
  CampaignCreateVariables
>(campaingCreate);
