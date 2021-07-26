import { InputAdornment, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  VacancyFacetMap,
  VacancySearchCriteria,
} from "@temp/core/apiLayer/vacancyService";

import messages from "../messages";
import SingleFacetFilter from "./SingleFacetFilter";

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
  const intl = useIntl();

  const handleQueryChange = e => {
    onChangeCriteria("query", [e.target.value || ""]);
  };
  const handleQueryClear = () => {
    onChangeCriteria("query", "");
  };
  const isQueryPresent = !!criteria.query;

  return (
    <div className={classes.root} data-testid="filter-sidebar">
      <div className={classes.group}>
        <TextField
          data-testid="query-global"
          placeholder={intl.formatMessage(messages.searchVacancies)}
          fullWidth
          value={criteria.query}
          onChange={handleQueryChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            ...(isQueryPresent && {
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
          {intl.formatMessage(messages.searchResults)}
        </Typography>
        <Typography color="textPrimary" variant="subtitle1">
          <FormattedMessage
            {...messages.searchResultCount}
            values={{ totalCount }}
          />
        </Typography>
      </div>

      <div className={classes.group}>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.groupLabel}
          gutterBottom
        >
          {intl.formatMessage(messages.filterBy)}
        </Typography>

        {Object.entries(facetGroups).map(([key, group]) => (
          <SingleFacetFilter
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
