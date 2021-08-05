import { CollectionDetails as Collection } from "../../fragments/gqlTypes/CollectionDetails";
import BaseDetails, { MapQueryData } from "../../helpers/BaseDetails";
import { collectionDetails } from "../../queries/collections";
import {
  CollectionDetails as CollectionDetailsQuery,
  CollectionDetailsVariables,
} from "../../queries/gqlTypes/CollectionDetails";

export class CollectionDetails extends BaseDetails<
  CollectionDetailsQuery,
  Collection,
  CollectionDetailsVariables
> {
  mapQueryData: MapQueryData<CollectionDetailsQuery, Collection> = data =>
    data.collection || undefined;

  query = (variables: CollectionDetailsVariables) =>
    this.client!.query<CollectionDetailsQuery, CollectionDetailsVariables>({
      query: collectionDetails,
      variables,
    });
}
