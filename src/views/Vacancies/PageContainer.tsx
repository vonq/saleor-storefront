import * as React from "react";

import { NextPage } from "next";
import VacanciesPageView from "./PageView";
import { fetchVacancyListAndFacets } from "@temp/core/apiLayer/vacancyService";

export const VacanciesPageContainer: NextPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [vacancyItems, setVacancyItems] = React.useState([]);
  const [itemsTotal, setItemsTotal] = React.useState(0);
  const [facetGroups, setFacetGroups] = React.useState([]);
  const [searchFilters, setSearchFilters] = React.useState({
    query: "",
    facets: {},
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { total, list, facets } = await fetchVacancyListAndFacets(
        searchFilters
      );
      setItemsTotal(total);
      setVacancyItems(list);
      setFacetGroups(facets);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
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
      loading={loading}
      vacancyItems={vacancyItems}
      searchFilters={searchFilters}
      facetGroups={facetGroups}
      itemsTotal={itemsTotal}
      onChangeFilters={handleFiltersChange}
    />
  );
};

export default VacanciesPageContainer;
