import gql from "graphql-tag";

import { TypedMutation } from "../../../../core/mutations";

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

const TaxedMoney = `
  gross {
    currency
    amount
  }
  net {
    currency
    amount
  }
`;

const Product = `
  id
  name
  productType {
    id
    isShippingRequired
  }
  thumbnail {
    alt
    url
  }
`;

const VariantPricingInfo = `
  onSale
  price {
    ${TaxedMoney}
  }
  priceUndiscounted {
    ${TaxedMoney}
  }
`;

const ProductVariant = `
  id
  name
  pricing {
    ${VariantPricingInfo}
  }
  product {
    ${Product}
  }
  quantityAvailable
  sku
`;

const CheckoutLine = `
  id
  quantity
  variant {
    ${ProductVariant}
  }
  totalPrice {
    ${TaxedMoney}
  }
  requiresShipping
`;

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
        lines {
          ${CheckoutLine}
        }
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
