import * as React from "react";

import { NextPage } from "next";
import VacanciesPageView from "./PageView";
import {
  fetchVacancyFacets,
  fetchVacancyList,
} from "@temp/core/apiLayer/vacancyService";

const PAGE_SIZE = 25;

export const VacanciesPageContainer: NextPage = () => {
  const [itemsLoading, setItemsLoading] = React.useState(false);
  const [itemsList, setItemsList] = React.useState([]);
  const [itemsTotal, setItemsTotal] = React.useState(0);
  const [facetsLoading, setFacetsLoading] = React.useState(false);
  const [facetGroups, setFacetGroups] = React.useState([]);
  const [searchFilters, setSearchFilters] = React.useState({
    query: "",
    facets: {},
  });
  const { current: paging } = React.useRef({ number: 0, hasMore: true });

  // API call to get list of vacancies
  const fetchItemsList = async () => {
    if (itemsLoading || !paging.hasMore) {
      return false;
    }

    try {
      setItemsLoading(true);
      const { total, list } = await fetchVacancyList({
        ...searchFilters,
        offset: paging.number * PAGE_SIZE,
        limit: PAGE_SIZE,
      });

      let newList;
      if (paging.number === 0) {
        newList = list;
        setItemsTotal(total);
      } else {
        newList = itemsList.concat(list);
      }
      setItemsList(newList);

      paging.number++;
      paging.hasMore = newList.length < total;
    } finally {
      setItemsLoading(false);
    }
  };

  // API call to get facets data
  const fetchFacets = async () => {
    try {
      setFacetsLoading(true);
      const facets = await fetchVacancyFacets(searchFilters);
      setFacetGroups(facets);
    } finally {
      setFacetsLoading(false);
    }
  };

  // State changed: "searchFilters"
  React.useEffect(() => {
    const resetAndFetch = async () => {
      paging.number = 0;
      paging.hasMore = true;
      setItemsList([]);
      await Promise.all([fetchItemsList(), fetchFacets()]);
    };
    resetAndFetch();
  }, [searchFilters]);

  // Listener for search query, facets change
  const handleFiltersChange = (key, value) => {
    if (key === "query") {
      setSearchFilters({ ...searchFilters, query: value });
    } else {
      setSearchFilters({
        ...searchFilters,
        facets: {
          ...searchFilters.facets,
          [key]: value,
        },
      });
    }
  };

  // Listener for infinite scrolling
  const loadMoreItems = () => {
    fetchItemsList();
  };

  return (
    <VacanciesPageView
      searchFilters={searchFilters}
      facetGroups={facetGroups}
      onChangeFilters={handleFiltersChange}
      itemsLoading={itemsLoading}
      itemsList={itemsList}
      itemsTotal={itemsTotal}
      hasMoreItems={paging.hasMore}
      loadMoreItems={loadMoreItems}
    />
  );
};

export default VacanciesPageContainer;
