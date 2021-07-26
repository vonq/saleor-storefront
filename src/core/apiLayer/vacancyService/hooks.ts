import { useEffect, useReducer } from "react";

import { fetchVacancyFacets, fetchVacancyList } from "./api";
import { VacancyFacetSingle, VacancySearchCriteria } from "./types";

const PAGE_SIZE = 24;

/**
 * Hooks for list of vacancies
 */
const initStateForList = {
  itemList: [], // Array<VacancyItem>
  totalCount: 0,
  offset: 0,
  criteria: {},
  loading: true,
  hasMore: false,
  pageSize: PAGE_SIZE,
};

function reducerForList(state, action) {
  switch (action.type) {
    case "changeCriteria":
      if (Object.is(state.criteria, action.criteria)) {
        return state;
      }

      return {
        ...state,
        criteria: action.criteria,
        offset: 0,
        itemList: [],
        hasMore: true,
        loading: true,
      };

    case "itemsLoaded": {
      if (!Object.is(state.criteria, action.criteria)) {
        return state;
      }

      const itemList = [...state.itemList, ...action.itemList];
      // API returns totalCount of 0 when out of offset
      const totalCount =
        state.offset === 0 ? action.totalCount : state.totalCount;

      return {
        ...state,
        loading: false,
        itemList,
        totalCount,
        hasMore: itemList.length < totalCount,
      };
    }

    case "loadMore":
      if (state.loading) {
        return state;
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

export const useApiForVacancyList = (
  criteria: VacancySearchCriteria,
  pageSize: number = PAGE_SIZE
) => {
  const [state, dispatch] = useReducer(reducerForList, {
    ...initStateForList,
    criteria,
    pageSize,
  });

  useEffect(() => {
    dispatch({ type: "changeCriteria", criteria });
  }, [criteria]);

  const loadMore = () => dispatch({ type: "loadMore" });

  useEffect(() => {
    const getApiData = async () => {
      const response = await fetchVacancyList({
        criteria: state.criteria,
        offset: state.offset,
        limit: pageSize,
      });
      dispatch({
        type: "itemsLoaded",
        totalCount: response.totalHits,
        itemList: response.vacancies,
        criteria: state.criteria,
        offset: state.offset,
      });
    };

    getApiData();
  }, [state.criteria, state.offset]);

  return {
    loading: state.loading,
    hasMore: state.hasMore,
    itemList: state.itemList,
    totalCount: state.totalCount,
    loadMore,
  };
};

/**
 * Hook for vacancy facets
 */
const initStateForFacets = {
  facetGroups: {}, // VacancyFacetGroup
  criteria: {},
  loading: true,
};

function reducerForFacets(state, action) {
  switch (action.type) {
    case "changeCriteria":
      if (Object.is(state.criteria, action.criteria)) {
        return state;
      }

      return {
        ...state,
        criteria: action.criteria,
        loading: true,
      };

    case "itemsLoaded": {
      return {
        ...state,
        facetGroups: normalizeFacesResponse(action.facets),
        loading: false,
      };
    }

    default:
      throw new Error();
  }
}

export const useApiForVacancyFacets = (criteria: VacancySearchCriteria) => {
  const [state, dispatch] = useReducer(reducerForFacets, {
    ...initStateForFacets,
    criteria,
  });

  useEffect(() => {
    dispatch({ type: "changeCriteria", criteria });
  }, [criteria]);

  useEffect(() => {
    const getApiData = async () => {
      const response = await fetchVacancyFacets({ criteria: state.criteria });
      dispatch({ type: "itemsLoaded", facets: response });
    };

    getApiData();
  }, [state.criteria]);

  return {
    loading: state.loading,
    facetGroups: state.facetGroups,
  };
};

const normalizeFacesResponse = (facetList: Array<VacancyFacetSingle>) => {
  return facetList.reduce((acc, cur) => {
    acc[cur.key] = cur;
    return acc;
  }, {});
};
