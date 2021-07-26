import React, { useState } from "react";

import { NextPage } from "next";
import PageView from "./PageView";
import {
  VacancySearchCriteria,
  useApiForVacancyFacets,
  useApiForVacancyList,
} from "@temp/core/apiLayer/vacancyService";

const initCriteria: VacancySearchCriteria = {
  query: "",
  facets: {},
};

export const PageContainer: NextPage = () => {
  const [criteria, setCriteria] = useState<VacancySearchCriteria>(initCriteria);
  const {
    itemList,
    totalCount,
    loading: listLoading,
    hasMore,
    loadMore,
  } = useApiForVacancyList(criteria);
  const { facetGroups } = useApiForVacancyFacets(criteria);

  // Listener for search query, facets change
  const handleCriteriaChange = (key: string, value: Array<string | number>) => {
    if (key === "query") {
      setCriteria({ ...criteria, query: value[0] as string });
    } else {
      setCriteria({
        ...criteria,
        facets: {
          ...criteria.facets,
          [key]: value,
        },
      });
    }
  };

  return (
    <PageView
      itemList={itemList}
      totalCount={totalCount}
      loading={listLoading}
      facetGroups={facetGroups}
      criteria={criteria}
      hasMore={hasMore}
      onChangeCriteria={handleCriteriaChange}
      onLoadMore={loadMore}
    />
  );
};

export default PageContainer;
