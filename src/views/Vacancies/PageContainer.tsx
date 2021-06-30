import * as React from "react";

import { NextPage } from "next";
import VacanciesPageView from "./PageView";
import { fetchVacancies } from "@temp/core/apiLayer/vacancyService";

export const VacanciesPageContainer: NextPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [vacancyItems, setVacancyItems] = React.useState([]);
  const [itemsTotal, setItemsTotal] = React.useState(0);
  const [facetOptions, setFacetOptions] = React.useState([]);
  const [searchFilters, setSearchFilters] = React.useState({
    query: "text",
    facets: {},
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchVacancies();
      setItemsTotal(response["total"]);
      setVacancyItems(response["list"]);
      setFacetOptions(response["facets"]);
      // const { total, facets, list } = fetchVacancies();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleFiltersChange = (key, value) => {
    setSearchFilters({
      ...searchFilters,
      [key]: value,
    });
  };

  return (
    <VacanciesPageView
      loading={loading}
      vacancyItems={vacancyItems}
      searchFilters={searchFilters}
      facetOptions={facetOptions}
      itemsTotal={itemsTotal}
      onChangeFilters={handleFiltersChange}
    />
  );
};

export default VacanciesPageContainer;
