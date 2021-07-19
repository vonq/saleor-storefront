import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";

import { Loader } from "@components/atoms";
import VacancyListItem from "./VacancyListItem";
import { VacancyItem } from "@temp/core/apiLayer/vacancyService";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "1rem",
  },
  loaderRow: {
    height: theme.spacing(8),
  },
}));
interface CompProps {
  itemList: Array<VacancyItem>;
  hasMore: Boolean;
  onLoadMore: Function;
}

export const VacancyList: React.FC<CompProps> = ({
  itemList = [],
  hasMore,
  onLoadMore,
}) => {
  const classes = useStyles();
  return (
    <div>
      <InfiniteScroll
        threshold={0}
        pageStart={0}
        initialLoad={false}
        hasMore={hasMore}
        loadMore={onLoadMore}
        loader={
          <div className={classes.loaderRow} key="spinner-bottom">
            <Loader />
          </div>
        }
      >
        {itemList.map(item => (
          <VacancyListItem key={item["vacancyId"]} data={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default VacancyList;
