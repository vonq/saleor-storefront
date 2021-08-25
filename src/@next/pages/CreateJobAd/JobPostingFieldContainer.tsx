import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { ReactElement, ReactNode } from "react";

interface IProps {
  title: string | ReactElement;
  description?: string | ReactElement;
  children: ReactNode;
}

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(1),
  },
}));

const JobPostingFieldContainer = ({ title, description, children }: IProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h6" component="h3" className={classes.title}>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
          {description}
        </Typography>
      )}
      {children}
    </Box>
  );
};

JobPostingFieldContainer.defaultProps = {
  description: "",
};

export default JobPostingFieldContainer;
