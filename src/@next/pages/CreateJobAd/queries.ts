import gql from "graphql-tag";

export const getCheckoutQuery = gql`
  query GetCheckout($token: UUID!) {
    checkout(token: $token) {
      id
      token
      totalPrice {
        gross {
          amount
          currency
        }
      }
      availablePaymentGateways {
        id
        name
        config {
          field
          value
        }
      }
      metadata {
        key
        value
      }
    }
  }
`;
