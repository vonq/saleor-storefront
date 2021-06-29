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
}

const VacanciesPageView: React.FC<PageProps> = ({ loading, vacancyItems }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <FilterSidebar />
      </div>
      <div className={classes.content}>
        <FilterTagsHeader />
        <VacancyList items={vacancyItems} />
      </div>
    </div>
  );
};

export default VacanciesPageView;
