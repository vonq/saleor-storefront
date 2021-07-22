import {
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import { useRouter } from "next/router";
import React from "react";

import { Loader } from "@components/atoms";
import {
  apolloClient,
  createCheckoutQuery,
} from "@components/organisms/SetTargetGroup/queries";

import JobCriteriaForm from "./JobCriteriaForm";
import JobPostingDetailsForm from "./JobPostingDetailsForm";

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
  step: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}));

const CreateJobAd = () => {
  const classes = useStyles();
  const { replace } = useRouter();
  const { user } = useAuth();
  const { loaded: cartLoaded, items } = useCart();
  const {
    loaded: checkoutLoaded,
    checkout,
    // payment,
    // availablePaymentGateways,
    // createPayment,
    // completeCheckout,
  } = useCheckout();

  if (!cartLoaded || !checkoutLoaded) {
    return <Loader />;
  }

  if (!items || !items.length) {
    replace("/cart");
    return null;
  }

  const createCheckout = async () => {
    try {
      const email = user?.email || "customer@example.com";
      const response = await apolloClient.mutate({
        mutation: createCheckoutQuery,
        variables: {
          lines: (items || []).map(item => ({
            quantity: item.quantity,
            variantId: item.variant.id,
          })),
          email,
        },
      });
      const newCheckout = response?.data?.checkoutCreate?.checkout;
      localStorage.setItem(
        "data_checkout",
        JSON.stringify({
          ...newCheckout,
          lines: items,
          metadata: {},
        })
      );
      history.go(0);
    } catch (error) {
      console.log("Error on creating checkout", error); // eslint-disable-line no-console
    }
  };

  if (!checkout?.id) {
    createCheckout();
    return null;
  }

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={8}>
          <Typography variant="h4" component="h1">
            Create your job ad(s)
          </Typography>
          <Typography variant="body1" component="h6">
            Fill in the needed information for your job posting(s). Some fields
            are required by job boards to be able to post on it.
          </Typography>
          <JobPostingDetailsForm />
          <JobCriteriaForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateJobAd;
