import { BaseCollection } from "../../fragments/gqlTypes/BaseCollection";
import BaseList, {
  GetPageInfo,
  GetTotalCount,
  MapQueryData,
} from "../../helpers/BaseList";
import { collections } from "../../queries/collections";
import {
  CollectionList as CollectionListQuery,
  CollectionListVariables,
} from "../../queries/gqlTypes/CollectionList";

export class CollectionList extends BaseList<
  CollectionListQuery,
  BaseCollection,
  CollectionListVariables
> {
  getPageInfo: GetPageInfo<CollectionListQuery> = result =>
    result.data.collections?.pageInfo!;

  getTotalCount: GetTotalCount<CollectionListQuery> = result =>
    result.data.collections?.totalCount!;

  mapQueryData: MapQueryData<CollectionListQuery, BaseCollection> = data =>
    data.collections?.edges.map(({ node }) => node);

  query = (variables: CollectionListVariables) =>
    this.client!.query<CollectionListQuery, CollectionListVariables>({
      query: collections,
      variables,
    });
}
