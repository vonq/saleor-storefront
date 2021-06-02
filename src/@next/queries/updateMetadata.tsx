import gql from "graphql-tag";

import { TypedMutation } from "@temp/core/mutations";

type MetadataInput = {
  key: String;
  value: String;
};

const updateMetadata = gql`
  mutation MetadataUpdate($id: ID!, $metadata: [MetadataInput!]!) {
    updateMetadata(id: $id, input: $metadata) {
      metadataErrors {
        message
      }
      item {
        metadata {
          key
          value
        }
      }
    }
  }
`;

enum MetadataErrorCode {
  INVALID,
  DUPLICATED_INPUT_ITEM,
  GRAPHQL_ERROR,
  UNIQUE,
  REQUIRED,
}

type MetadataError = {
  field: String;
  message: String;
  code: MetadataErrorCode;
};
export interface MetadataUpdate {
  updateMetadata: any;
  data: any;
  metadataErrors: [MetadataError];
  item: [MetadataInput];
}

export interface MetadataUpdateVariables {
  id: string;
  metadata: MetadataInput[];
}

export const TypedMetadataUpdateMutation = TypedMutation<
  MetadataUpdate,
  MetadataUpdateVariables
>(updateMetadata);
