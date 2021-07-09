import * as React from "react";

import { NextPage } from "next";
import VacanciesPageView from "./PageView";
import {
  fetchVacancyFacets,
  fetchVacancyList,
  fetchVacancyListAndFacets,
} from "@temp/core/apiLayer/vacancyService";

const PAGE_SIZE = 25;
const PAGE_NUMBER_START = 1;

export const VacanciesPageContainer: NextPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [itemsLoading, setItemsLoading] = React.useState(false);
  const [itemsList, setItemsList] = React.useState([]);
  const [itemsTotal, setItemsTotal] = React.useState(0);
  const [facetsLoading, setFacetsLoading] = React.useState(false);
  const [facetGroups, setFacetGroups] = React.useState([]);
  const [searchFilters, setSearchFilters] = React.useState({
    query: "",
    facets: {},
  });
  const [pageNumber, setPageNumber] = React.useState(PAGE_NUMBER_START);
  const [pageHasMore, setPageHasMore] = React.useState(true);

  const fetchItemsList = async (pageNumber = PAGE_NUMBER_START) => {
    if (itemsLoading) {
      return false;
    }

    try {
      setItemsLoading(true);
      const { total, list } = await fetchVacancyList({
        ...searchFilters,
        offset: (pageNumber - 1) * PAGE_SIZE,
      });
      const newList = itemsList.concat(list);
      total > 0 && setItemsTotal(total);
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

  React.useEffect(() => {
    const resetAndFetch = async () => {
      setPageNumber(PAGE_NUMBER_START);
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

  const loadMoreItems = newPageNumber => {
    fetchItemsList(newPageNumber);
  };

  return (
    <VacanciesPageView
      loading={itemsLoading}
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
