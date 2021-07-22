import { Avatar, Box, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  step: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}));

const JobStepNumber = ({
  number,
  title,
}: {
  number: number;
  title: string;
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Avatar className={classes.step}>{number}</Avatar>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
    </Box>
  );
};

export default JobStepNumber;
