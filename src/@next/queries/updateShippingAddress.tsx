import gql from "graphql-tag";

import { TypedMutation } from "@temp/core/mutations";

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
export interface ShippingAddressUpdate {
  checkoutCreate: any;
  data: any;
  checkoutErrors: [CheckoutError];
  checkout: CheckoutType;
}

type CountryDisplay = {
  code: string;
  country: string;
};

type Address = {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  cityArea: string;
  postalCode: string;
  country: CountryDisplay;
  countryArea: string;
  phone: String;
  isDefaultShippingAddress: Boolean;
  isDefaultBillingAddress: Boolean;
};

export interface ShippingAddressUpdateVariables {
  email: string;
  shippingAddress: Address;
}

export const shippingAddressUpdate = gql`
  mutation checkoutShippingAddressUpdate($email: String!; $shippingAddres: Address) {
    shippingAddressUpdate(
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
        lines
      }
      checkoutErrors {
        field
        code
      }
    }
  }
`;

export const TypedShippingAddressUpdateMutation = TypedMutation<
  ShippingAddressUpdate,
  ShippingAddressUpdateVariables
>(shippingAddressUpdate);
