import * as React from "react";

import { NextPage } from "next";
import VacanciesPageView from "./PageView";
import {
  fetchVacancyFacets,
  fetchVacancyList,
  fetchVacancyListAndFacets,
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
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageHasMore, setPageHasMore] = React.useState(true);

  const fetchItemsList = async (pageNumber = 0) => {
    if (itemsLoading) {
      return false;
    }

    try {
      setItemsLoading(true);
      const { total, list } = await fetchVacancyList({
        ...searchFilters,
        offset: pageNumber * PAGE_SIZE,
      });

      let newList = [];
      if (pageNumber === 0) {
        newList = list;
        setItemsTotal(total);
      } else {
        newList = itemsList.concat(list);
      }
      setItemsList(newList);
      setPageNumber(pageNumber);
      setPageHasMore(newList.length < total ? true : false);
    } finally {
      setItemsLoading(false);
    }
  };

  const fetchFacets = async () => {
    try {
      setFacetsLoading(true);
      const facets = await fetchVacancyFacets(searchFilters);
      setFacetGroups(facets);
    } finally {
      setFacetsLoading(false);
    }
  };

  const loadMoreItems = newPageNumber => {
    fetchItemsList(newPageNumber);
  };

  React.useEffect(() => {
    const resetAndFetch = async () => {
      setPageNumber(0);
      setPageHasMore(true);
      await Promise.all([fetchItemsList(), fetchFacets()]);
    };
    resetAndFetch();
  }, [searchFilters]);

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

  return (
    <VacanciesPageView
      itemsLoading={itemsLoading}
      searchFilters={searchFilters}
      facetGroups={facetGroups}
      onChangeFilters={handleFiltersChange}
      itemsList={itemsList}
      itemsTotal={itemsTotal}
      hasMoreItems={pageHasMore}
      loadMoreItems={loadMoreItems}
    />
  );
};

export default VacanciesPageContainer;
