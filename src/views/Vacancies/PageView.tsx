import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  VacancyItem,
  VacancySearchCriteria,
  VacancyFacetMap,
} from "@temp/core/apiLayer/vacancyService";
import { FilterSidebar, FilterTagsHeader, VacancyList } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  sidebar: {
    flex: "none",
    width: "18rem",
    minHeight: "100%",
  },
  content: {
    flex: 1,
    maxWidth: "48rem",
    margin: "1.5rem auto",
    minHeight: "100%",
  },
}));

interface PageProps {
  itemList: Array<VacancyItem>;
  totalCount: number;
  loading: boolean;
  facetGroups: VacancyFacetMap;
  criteria: VacancySearchCriteria;
  hasMore: boolean;
  onChangeCriteria: Function;
  onLoadMore: Function;
}

const VacanciesPageView: React.FC<PageProps> = ({
  itemList,
  totalCount,
  loading,
  facetGroups,
  criteria,
  hasMore,
  onChangeCriteria,
  onLoadMore
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <FilterSidebar
          totalCount={totalCount}
          facetGroups={facetGroups}
          criteria={criteria}
          onChangeCriteria={onChangeCriteria}
        />
      </div>
      <div className={classes.content}>
        <FilterTagsHeader
          facetGroups={facetGroups}
          criteria={criteria}
          onChangeCriteria={onChangeCriteria}
        />
        <VacancyList
          itemList={itemList}
          hasMore={hasMore}
          onLoadMore={onLoadMore}
        />
      </div>
    </div>
  );
};

export default VacanciesPageView;
