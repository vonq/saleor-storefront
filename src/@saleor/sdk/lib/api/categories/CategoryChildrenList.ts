import { BaseCategory } from "../../fragments/gqlTypes/BaseCategory";
import BaseList, {
  GetPageInfo,
  GetTotalCount,
  MapQueryData,
} from "../../helpers/BaseList";
import { categoryChildrenList } from "../../queries/category";
import {
  CategoryChildrenList as CategoryChildrenListQuery,
  CategoryChildrenListVariables,
} from "../../queries/gqlTypes/CategoryChildrenList";

export class CategoryChildrenList extends BaseList<
  CategoryChildrenListQuery,
  BaseCategory,
  CategoryChildrenListVariables
> {
  getPageInfo: GetPageInfo<CategoryChildrenListQuery> = result =>
    result.data.category?.children?.pageInfo!;

  getTotalCount: GetTotalCount<CategoryChildrenListQuery> = result =>
    result.data.category?.children?.totalCount!;

  mapQueryData: MapQueryData<CategoryChildrenListQuery, BaseCategory> = data =>
    data.category?.children?.edges.map(({ node }) => node);

  query = (variables: CategoryChildrenListVariables) =>
    this.client!.query<
      CategoryChildrenListQuery,
      CategoryChildrenListVariables
    >({
      query: categoryChildrenList,
      variables,
    });
}
