import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    borderRight: "1px solid #e0e0e0",
    background: "#f1f5f5",
    padding: "1.5rem",
    height: "100%",
  },
}));

export const FilterSidebar: React.FC = ({}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Input
        id="search-text"
        placeholder="Search on vacancies"
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </div>
  );
};

export default FilterSidebar;
