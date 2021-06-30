import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { FilterSidebar, FilterTagsHeader, VacancyList } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  sidebar: {
    flex: "none",
    width: "18rem",
  },
  content: {
    flex: 1,
    maxWidth: "48rem",
    margin: "1.5rem auto",
  },
}));

interface PageProps {
  loading: boolean;
  vacancyItems: Array<any>;
  itemsTotal: number;
  facetOptions: any;
  searchFilters: any;
  onChangeFilters: Function;
}

const VacanciesPageView: React.FC<PageProps> = ({
  loading,
  vacancyItems,
  itemsTotal,
  facetOptions,
  searchFilters,
  onChangeFilters,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <FilterSidebar
          itemsTotal={itemsTotal}
          facetOptions={facetOptions}
          searchFilters={searchFilters}
          onChangeFilters={onChangeFilters}
        />
      </div>
      <div className={classes.content}>
        <FilterTagsHeader />
        <VacancyList items={vacancyItems} />
      </div>
    </div>
  );
};

export default VacanciesPageView;
