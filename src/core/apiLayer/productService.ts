import { stringify } from "query-string";
import { useEffect, useReducer } from "react";

import { apiUrl } from "@temp/constants";

const fetchProducts = (criteria: any, limit: number, offset: number) => {
  const query = stringify({
    ...criteria,
    currency: "EUR",
    limit,
    offset,
  });

  return fetch(`${apiUrl}../pkb/products/?${query}`, {
    headers: {
      Authorization: "Basic YWRtaW5AYWRtaW4uY29tOm9NWFVvR1p0UDV6Mw==",
    },
  }).then(response => response.json());
};

const initialState = {
  productList: [],
  offset: 0,
  todoOffsets: [],
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
        todoOffsets: [],
        productList: [],
        hasMore: false,
        loading: true,
      };

    case "itemsLoaded": {
      if (!Object.is(state.criteria, action.criteria)) {
        return state;
      }

      const todoOffsets = state.todoOffsets.filter(
        offset => offset !== action.offset && offset < action.totalCount
      );

      const offset = todoOffsets[0] || state.offset;
      const productList = [...state.productList, ...action.products];

      return {
        ...state,
        todoOffsets,
        loading: todoOffsets.length > 0,
        productList,
        offset,
        hasMore: productList.length < action.totalCount,
      };
    }

    case "loadMore":
      if (state.todoOffsets.length > 0) {
        return {
          ...state,
          todoOffsets: [
            ...state.todoOffsets,
            Math.max(state.todoOffsets) + state.pageSize,
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

export const useSearchProducts = (criteria: any, pageSize: number) => {
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
    loadMore,
  };
};
