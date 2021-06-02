/* eslint-disable prettier/prettier */
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";
// import { CountryCode } from "gqlTypes/globalTypes";
import gql from "graphql-tag";

import { TypedMutation } from "../../../../core/mutations";

// ToDo: remove and merge with common updateMetadata
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

// Creating Checkout Object

export type CheckoutType = {
  id: any;
};

enum CheckoutErrorCode {
  INVALID,
  DUPLICATED_INPUT_ITEM,
  GRAPHQL_ERROR,
  UNIQUE,
  REQUIRED,
}

type CheckoutError = {
  field: String;
  message: String;
  code: CheckoutErrorCode;
};

export type CheckoutLineInput = {
  quantity: number;
  variantId: string;
};
export interface CheckoutCreate {
  checkoutCreate: any;
  data: any;
  checkoutErrors: [CheckoutError];
  checkout: CheckoutType;
}

export interface CheckoutCreateVariables {
  lines: CheckoutLineInput[];
}

export const createCheckout = gql`
  mutation CheckoutCreate($lines: [CheckoutLineInput]!) {
    checkoutCreate(
      input: {
        channel: "default-channel"
        email: "customer@example.com"
        lines: $lines
        shippingAddress: {
          firstName: "John"
          lastName: "Doe"
          streetAddress1: "1470  Pinewood Avenue"
          city: "Michigan"
          postalCode: "49855"
          country: US
          countryArea: "MI"
        }
        billingAddress: {
          firstName: "John"
          lastName: "Doe"
          streetAddress1: "1470  Pinewood Avenue"
          city: "Michigan"
          postalCode: "49855"
          country: US
          countryArea: "MI"
        }
      }
    ) {
      checkout {
        id
      }
      checkoutErrors {
        field
        code
      }
    }
  }
`;

export const TypedCheckoutCreateMutation = TypedMutation<
  CheckoutCreate,
  CheckoutCreateVariables
>(createCheckout);
