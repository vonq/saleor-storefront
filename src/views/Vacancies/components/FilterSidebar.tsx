import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import FacetFilter from "./FacetFilter";

const useStyles = makeStyles(theme => ({
  root: {
    borderRight: "1px solid #e0e0e0",
    background: "#f1f5f5",
    padding: theme.spacing(3),
    height: "100%",
  },
  group: {
    marginBottom: theme.spacing(3),
  },
  groupLabel: {
    textTransform: "uppercase",
  },
}));

interface CompProps {
  itemsTotal: number;
  facetGroups: any;
  searchFilters: any;
  onChangeFilters: Function;
}

export const FilterSidebar: React.FC<CompProps> = ({
  itemsTotal,
  facetGroups,
  searchFilters,
  onChangeFilters,
}) => {
  const classes = useStyles();
  const { query, facets } = searchFilters;

  const handleQueryChange = e => {
    onChangeFilters("query", e.target.value || "");
  };

  return (
    <div className={classes.root}>
      <div className={classes.group}>
        <TextField
          id="search-query"
          placeholder="Search on vacancies"
          fullWidth
          value={query}
          onChange={handleQueryChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className={classes.group}>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.groupLabel}
        >
          Search Results
        </Typography>
        <Typography color="textPrimary" variant="subtitle1">
          {`${itemsTotal || 0} vacancies`}
        </Typography>
      </div>

      <div className={classes.group}>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.groupLabel}
          gutterBottom
        >
          Filter By
        </Typography>

        {facetGroups.map(group => (
          <FacetFilter
            key={group.key}
            facetFilters={searchFilters['facets']}
            facetDetails={group}
            onChangeFilters={onChangeFilters}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
