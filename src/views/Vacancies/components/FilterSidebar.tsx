import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import {
  VacancySearchCriteria,
  VacancyFacetMap,
} from "@temp/core/apiLayer/vacancyService";
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
  closeIcon: {
    cursor: "pointer",
  },
}));

interface CompProps {
  totalCount: number;
  facetGroups: VacancyFacetMap;
  criteria: VacancySearchCriteria;
  onChangeCriteria: Function;
}

export const FilterSidebar: React.FC<CompProps> = ({
  totalCount,
  facetGroups,
  criteria,
  onChangeCriteria,
}) => {
  const classes = useStyles();
  const handleQueryChange = e => {
    onChangeCriteria("query", [e.target.value || ""]);
  };
  const handleQueryClear = () => {
    onChangeCriteria("query", "");
  };
  const hasQuery = !!criteria["query"];

  return (
    <div className={classes.root}>
      <div className={classes.group}>
        <TextField
          id="search-query"
          placeholder="Search on vacancies"
          fullWidth
          value={criteria["query"]}
          onChange={handleQueryChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            ...(hasQuery && {
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={handleQueryClear}
                  className={classes.closeIcon}
                >
                  <CloseIcon />
                </InputAdornment>
              ),
            }),
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
          {`${totalCount || 0} vacancies`}
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

        {Object.entries(facetGroups).map(([key, group]) => (
          <FacetFilter
            key={key}
            criteriaFacets={criteria.facets}
            facetInfo={group}
            onChangeCriteria={onChangeCriteria}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
