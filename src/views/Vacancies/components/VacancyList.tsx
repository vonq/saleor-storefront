import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";

import { Loader } from "@components/atoms";
import VacancyListItem from "./VacancyListItem";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "1rem",
  },
  loaderRow: {
    height: theme.spacing(8),
  },
}));
interface CompProps {
  loading: Boolean;
  hasMoreItems: Boolean;
  loadMoreItems: Function;
  itemsList: Array<any>;
}

export const VacanciesList: React.FC<CompProps> = ({
  loading,
  itemsList = [],
  hasMoreItems,
  loadMoreItems,
}) => {
  const classes = useStyles();
  return (
    <div>
      <InfiniteScroll
        threshold={0}
        pageStart={0}
        hasMore={!loading && hasMoreItems}
        loadMore={loadMoreItems}
        loader={
          <div className={classes.loaderRow}>
            <Loader />
          </div>
        }
      >
        {/* {loading && (
          <div className={classes.loaderRow}>
            <Loader />
          </div>
        )} */}
        {itemsList.map(item => (
          <VacancyListItem key={item["vacancyId"]} data={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default VacanciesList;
