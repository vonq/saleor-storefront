import {
  Button,
  CardActions,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import useInfiniteScroll from "@temp/core/useInfiniteScroll";

import { MoreInfoDrawer, ProductCard, Sidebar } from "./components";
import { messages } from "./messages";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  products: {
    padding: theme.spacing(2),
  },
  loading: {
    textAlign: "center",
  },
}));

interface PageProps {
  loading: boolean;
  hasMore: boolean;
  criteria: { name?: string };
  productList: Array<any>;
  totalCount: number;
  onChangeCriteria: (criteria: any) => void;
  onLoadMore: () => void;
}

export const PageView: React.FC<PageProps> = ({
  productList,
  totalCount,
  onChangeCriteria,
  criteria,
  onLoadMore,
  loading,
  hasMore,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const loadMoreRef = useInfiniteScroll(onLoadMore, [productList]);

  const showProductInfo = product => () => {
    setProduct(product);
    setOpen(true);
  };

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={3} lg={3} xl={2}>
          <Sidebar criteria={criteria} onChangeCriteria={onChangeCriteria} />
        </Grid>
        <Grid
          item
          container
          spacing={4}
          xs
          alignContent="flex-start"
          className={classes.products}
        >
          <Grid item xs={12}>
            <Typography align="center" variant="h4" component="h1">
              <FormattedMessage {...messages.exploreChannels} />
            </Typography>
            {(!loading || productList.length > 0) && (
              <Typography align="center" variant="h5" component="h1">
                <FormattedMessage
                  {...messages.numberChannelsFound}
                  values={{ totalCount }}
                />
              </Typography>
            )}
          </Grid>

          {productList.map(product => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={product.product_id}>
              <ProductCard product={product} onClick={showProductInfo(product)}>
                <CardActions>
                  <Button
                    size="small"
                    fullWidth
                    color="primary"
                    onClick={showProductInfo(product)}
                  >
                    <FormattedMessage {...messages.moreInformation} />
                  </Button>
                </CardActions>
              </ProductCard>
            </Grid>
          ))}

          <Grid item xs={12} className={classes.loading}>
            {!!hasMore && <div ref={loadMoreRef} />}
            {!!loading && <CircularProgress />}
          </Grid>
        </Grid>
      </Grid>
      <MoreInfoDrawer
        product={product}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Container>
  );
};

export default PageView;
