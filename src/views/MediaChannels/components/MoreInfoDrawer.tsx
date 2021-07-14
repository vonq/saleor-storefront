import { Drawer, makeStyles, Theme, Typography } from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: 400,
  },
  moreInfoContent: {
    padding: theme.spacing(4),
  },
  moreInfologo: {
    width: "100%",
  },
}));

interface MoreInfoDrawerProps {
  product: any;
  open: boolean;
  onClose: () => void;
}

export const MoreInfoDrawer: React.FC<MoreInfoDrawerProps> = ({
  open,
  product,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{ paper: classes.root }}
    >
      <div className={classes.moreInfoContent}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.title}
        >
          {product?.title}
        </Typography>
        <img
          alt={product?.title}
          src={product?.logo_rectangle_url?.[0]?.url}
          className={classes.moreInfologo}
        />
        <Typography gutterBottom variant="body1">
          {product?.description}
        </Typography>
      </div>
    </Drawer>
  );
};

export default MoreInfoDrawer;
