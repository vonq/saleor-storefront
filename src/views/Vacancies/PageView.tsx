import { Container, Grid, makeStyles } from "@material-ui/core";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroller";

import { Loader } from "@components/atoms";
import {
  VacancyFacetMap,
  VacancyItem,
  VacancySearchCriteria,
} from "@temp/core/apiLayer/vacancyService";

import { ActiveFilterTags, FilterSidebar, VacancyCard } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  mainContent: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  loaderRow: {
    height: theme.spacing(8),
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
  onLoadMore,
}) => {
  const classes = useStyles();

  return (
    <Container
      maxWidth="xl"
      disableGutters
      className={classes.root}
      data-testid="page-wrapper"
    >
      <Grid container>
        <Grid item xs={12} md={3} lg={3} xl={2}>
          <FilterSidebar
            totalCount={totalCount}
            facetGroups={facetGroups}
            criteria={criteria}
            onChangeCriteria={onChangeCriteria}
          />
        </Grid>
        <Grid
          item
          container
          xs
          justify="center"
          className={classes.mainContent}
        >
          <Grid item xs={12} md={8}>
            <ActiveFilterTags
              facetGroups={facetGroups}
              criteria={criteria}
              onChangeCriteria={onChangeCriteria}
            />

            <InfiniteScroll
              data-testid="vacancy-card-list"
              threshold={0}
              pageStart={0}
              initialLoad={false}
              hasMore={hasMore}
              loadMore={onLoadMore}
              loader={
                <div
                  className={classes.loaderRow}
                  key="spinner-bottom"
                  data-testid="loading-spinner"
                >
                  <Loader />
                </div>
              }
            >
              {itemList.map(item => (
                <VacancyCard key={item.vacancyId} details={item} />
              ))}
            </InfiniteScroll>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VacanciesPageView;
