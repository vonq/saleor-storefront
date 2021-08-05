import { CategoryDetails as Category } from "../../fragments/gqlTypes/CategoryDetails";
import BaseDetails, { MapQueryData } from "../../helpers/BaseDetails";
import { categoryDetails } from "../../queries/category";
import {
  CategoryDetails as CategoryDetailsQuery,
  CategoryDetailsVariables,
} from "../../queries/gqlTypes/CategoryDetails";

export class CategoryDetails extends BaseDetails<
  CategoryDetailsQuery,
  Category,
  CategoryDetailsVariables
> {
  mapQueryData: MapQueryData<CategoryDetailsQuery, Category> = data =>
    data.category || undefined;

  query = (variables: CategoryDetailsVariables) =>
    this.client!.query<CategoryDetailsQuery, CategoryDetailsVariables>({
      query: categoryDetails,
      variables,
    });
}
