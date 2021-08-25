import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import DateRangeIcon from "@material-ui/icons/DateRange";
import * as React from "react";

const useStyles = makeStyles<Theme>(theme => ({
  media: {
    paddingBottom: "33.333%",
    margin: theme.spacing(2, 0),
  },
  title: {
    margin: theme.spacing(1, 0),
    height: 64,
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  duration: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    "& > svg": {
      marginRight: "0.25rem",
    },
  },
  price: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    justifyContent: "flex-end",
    "& > svg": {
      marginRight: "0.25rem",
    },
  },
}));

interface ProductCardProps {
  product: any;
  onClick: React.MouseEventHandler;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  children,
}) => {
  const classes = useStyles();
  const {
    logo_rectangle_url,
    title,
    audience_group,
    homepage,
    vonq_price,
    duration,
  } = product;

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Grid container>
            {!!duration?.period && (
              <Grid item xs={6} className={classes.duration}>
                <DateRangeIcon />
                <Box>{` ${duration?.period} days`}</Box>
              </Grid>
            )}
            <Grid item xs className={classes.price}>
              <CreditCardIcon />
              <Box>
                {` ${vonq_price?.[0].amount} ${vonq_price?.[0].currency}`}
              </Box>
            </Grid>
          </Grid>

          <CardMedia
            className={classes.media}
            image={logo_rectangle_url?.[0]?.url}
            title={title}
          />

          <Chip size="small" label={audience_group} />
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            className={classes.title}
          >
            {title}
          </Typography>
          <Box height={20}>
            {homepage && (
              <Link
                href={homepage}
                target="_blank"
                onClick={e => e.stopPropagation()}
              >
                {homepage}
              </Link>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      {children}
    </Card>
  );
};

export default ProductCard;
