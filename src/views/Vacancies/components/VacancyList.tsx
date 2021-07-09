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
  itemsLoading: Boolean;
  hasMoreItems: Boolean;
  loadMoreItems: Function;
  itemsList: Array<any>;
}

export const VacanciesList: React.FC<CompProps> = ({
  itemsLoading,
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
        initialLoad={false}
        hasMore={!itemsLoading && hasMoreItems}
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
