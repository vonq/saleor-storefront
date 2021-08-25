import { Box, makeStyles, Theme } from "@material-ui/core";
import React, { ReactNode } from "react";

interface StyleProps {
  noMarginBottom: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  root: props => ({
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px 0 rgb(51 51 51 / 20%)",
    padding: "22px 24px",
    borderRadius: "3px",
    marginBottom: props.noMarginBottom ? 0 : theme.spacing(5),
  }),
}));

const JobAdStepContainer = ({
  children,
  noMarginBottom,
}: {
  children: ReactNode;
  noMarginBottom?: boolean;
}) => {
  const styleProps: StyleProps = { noMarginBottom: !!noMarginBottom };
  const classes = useStyles(styleProps);
  return <Box className={classes.root}>{children}</Box>;
};

JobAdStepContainer.defaultProps = {
  noMarginBottom: false,
};

export default JobAdStepContainer;
