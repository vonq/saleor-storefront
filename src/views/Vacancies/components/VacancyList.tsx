import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Loader } from "@components/atoms";
import VacancyListItem from "./VacancyListItem";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "1rem",
  },
  loaderRow: {
    height: theme.spacing(8),
  },
}));
interface CompProps {
  loading: Boolean;
  items: Array<any>;
}

export const VacanciesList: React.FC<CompProps> = ({ loading, items = [] }) => {
  const classes = useStyles();
  return (
    <div>
      {loading && (
        <div className={classes.loaderRow}>
          <Loader />
        </div>
      )}
      {items.map(item => (
        <VacancyListItem key={item["vacancyId"]} data={item} />
      ))}
    </div>
  );
};

export default VacanciesList;
