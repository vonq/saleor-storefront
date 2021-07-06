import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";

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

export const createCheckoutQuery = gql`
  mutation CheckoutCreate($lines: [CheckoutLineInput]!, $email: String!) {
    checkoutCreate(
      input: {
        channel: "default-channel"
        email: $email
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
        totalPrice {
          gross {
            amount
            currency
          }
        }
        isShippingRequired
        availableShippingMethods {
          id
          name
        }
        availablePaymentGateways {
          id
          name
          config {
            field
            value
          }
        }
      }
      checkoutErrors {
        field
        code
      }
    }
  }
`;

const API_URL = process.env.NEXT_PUBLIC_API_URI || "/graphql/";
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: API_URL, fetch }),
});
