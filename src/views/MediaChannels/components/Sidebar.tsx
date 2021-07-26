import { Box, makeStyles, Theme } from "@material-ui/core";
import * as React from "react";

import { SearchProductCriteria } from "@temp/core/apiLayer/productService";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.sidebar,
    minHeight: "100%",
    padding: theme.spacing(4),
    borderRight: `1px solid ${theme.palette.grey["300"]}`,
  },
}));

interface SitebarProps {
  criteria: SearchProductCriteria;
  onChangeCriteria: (criteria: SearchProductCriteria) => void;
}

export const Sitebar: React.FC<SitebarProps> = () => {
  const classes = useStyles();

  return <Box className={classes.root} />;
};

export default Sitebar;
