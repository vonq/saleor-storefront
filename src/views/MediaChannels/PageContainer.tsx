import { NextPage } from "next";
import * as React from "react";
import { useState } from "react";

import {
  SearchProductCriteria,
  useSearchProducts,
} from "@temp/core/apiLayer/productService";

import PageView from "./PageView";

export const PageContainer: NextPage = () => {
  const [criteria, setCriteria] = useState<SearchProductCriteria>({});
  const {
    productList,
    totalCount,
    loading,
    hasMore,
    loadMore,
  } = useSearchProducts(
    criteria,
    24 // Page size 24 because it can be divided by 1,2,3 and 4
  );

  return (
    <PageView
      productList={productList}
      totalCount={totalCount}
      loading={loading}
      criteria={criteria}
      hasMore={hasMore}
      onChangeCriteria={setCriteria}
      onLoadMore={loadMore}
    />
  );
};

export default PageContainer;
