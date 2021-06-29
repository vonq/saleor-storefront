import * as React from "react";

import { NextPage } from "next";
import VacanciesPageView from "./PageView";
import { fetchVacancies } from "@temp/core/apiLayer/vacancyService";

export const VacanciesPageContainer: NextPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [vacancyItems, setVacancyItems] = React.useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchVacancies();
      setVacancyItems(response["list"]);
      // const { total, facets, list } = fetchVacancies();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <VacanciesPageView
      loading={loading}
      vacancyItems={vacancyItems}
    />
  );
};

export default VacanciesPageContainer;
