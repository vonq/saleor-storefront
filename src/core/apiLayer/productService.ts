import { stringify } from "query-string";
import { useEffect, useReducer } from "react";

import { pkbUrl } from "@temp/constants";

export interface SearchProductCriteria {
  name?: string;
}

const fetchProducts = (
  criteria: SearchProductCriteria,
  limit: number,
  offset: number
) => {
  const query = stringify({
    ...criteria,
    currency: "EUR",
    limit,
    offset,
  });

  return fetch(`${pkbUrl}products/?${query}`).then(response => response.json());
};

const initialState = {
  productList: [],
  totalCount: 0,
  offset: 0,
  todoOffsetsQueue: [],
  criteria: {},
  loading: true,
  hasMore: false,
  pageSize: 24,
};

function reducer(state, action) {
  switch (action.type) {
    case "changeCriteria":
      if (Object.is(state.criteria, action.criteria)) {
        return state;
      }

      return {
        ...state,
        criteria: action.criteria,
        offset: 0,
        todoOffsetsQueue: [],
        productList: [],
        hasMore: false,
        loading: true,
      };

    case "itemsLoaded": {
      if (!Object.is(state.criteria, action.criteria)) {
        return state;
      }

      const todoOffsetsQueue = state.todoOffsetsQueue.filter(
        offset => offset !== action.offset && offset < action.totalCount
      );

      const offset = todoOffsetsQueue[0] || state.offset;
      const productList = [...state.productList, ...action.products];

      return {
        ...state,
        todoOffsetsQueue,
        loading: todoOffsetsQueue.length > 0,
        productList,
        totalCount: action.totalCount,
        offset,
        hasMore: productList.length < action.totalCount,
      };
    }

    case "loadMore":
      if (state.todoOffsetsQueue.length > 0) {
        return {
          ...state,
          todoOffsetsQueue: [
            ...state.todoOffsetsQueue,
            Math.max(state.todoOffsetsQueue) + state.pageSize,
          ],
        };
      }

      return {
        ...state,
        loading: true,
        offset: state.offset + state.pageSize,
      };

    default:
      throw new Error();
  }
}

export const useSearchProducts = (
  criteria: SearchProductCriteria,
  pageSize: number
) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    criteria,
    pageSize,
  });

  useEffect(() => {
    dispatch({ type: "changeCriteria", criteria });
  }, [criteria]);

  const loadMore = () => dispatch({ type: "loadMore" });

  useEffect(() => {
    fetchProducts(state.criteria, state.pageSize, state.offset).then(
      (data: any) => {
        dispatch({
          type: "itemsLoaded",
          totalCount: data.count,
          products: data.results,
          criteria: state.criteria,
          offset: state.offset,
        });
      }
    );
  }, [state.criteria, state.offset]);

  return {
    loading: state.loading,
    hasMore: state.hasMore,
    productList: state.productList,
    totalCount: state.totalCount,
    loadMore,
  };
};
