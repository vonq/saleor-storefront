import { Button, CardActions, Grid } from "@material-ui/core";
import { memo } from "react";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { messages } from "../messages";
import ProductCard from "./ProductCard";

interface ProductListProps {
  productList: Array<any>;
  showProductInfo: (any) => () => void;
}

export const ProductList = memo<ProductListProps>(
  ({ productList, showProductInfo }) => (
    <>
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
    </>
  )
);

export default ProductList;
