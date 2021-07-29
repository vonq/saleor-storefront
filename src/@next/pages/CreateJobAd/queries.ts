import gql from "graphql-tag";

export const getCheckoutQuery = gql`
  query GetCheckout($token: UUID!) {
    checkout(token: $token) {
      id
      token
      email
      lines {
        id
        quantity
        totalPrice {
          gross {
            amount
            currency
          }
          net {
            amount
            currency
          }
        }
        variant {
          attributes {
            attribute {
              id
              name
            }
            values {
              id
              name
              value
            }
          }
          id
          name
          pricing {
            onSale
            priceUndiscounted {
              gross {
                amount
                currency
              }
              net {
                amount
                currency
              }
            }
            price {
              gross {
                amount
                currency
              }
              net {
                amount
                currency
              }
            }
          }
          product {
            id
            name
            thumbnail {
              url
              alt
            }
            productType {
              id
              isShippingRequired
            }
          }
          quantityAvailable
          sku
        }
      }
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
