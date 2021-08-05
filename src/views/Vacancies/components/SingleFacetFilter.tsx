/* eslint-disable react/jsx-no-duplicate-props */
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import _get from "lodash/get";
import React, { useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { VacancyFacetSingle } from "@temp/core/apiLayer/vacancyService";

import messages from "../messages";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "1rem",
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
  checkboxes: {},
  checkboxWrapper: {
    width: "100%",
  },
  checkboxLabel: {
    fontSize: "14px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

interface CompProps {
  facetInfo: VacancyFacetSingle;
  criteriaFacets: any;
  onChangeCriteria: Function;
}

export const FacetFilter: React.FC<CompProps> = ({
  facetInfo,
  criteriaFacets,
  onChangeCriteria,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [query, setQuery] = useState("");
  const optionsFiltered = useMemo(
    () =>
      _get(facetInfo, "options", []).filter(option =>
        isOptionMatching(option, query)
      ),
    [query, facetInfo]
  );

  const isChecked = option => {
    const values = criteriaFacets[facetInfo.key] || [];
    return values.includes(option.key);
  };

  const handleCheckOption = option => {
    const facetKey = facetInfo.key;
    const values = criteriaFacets[facetKey] || [];
    const newValues = values.includes(option.key)
      ? values.filter(e => e !== option.key)
      : values.concat(option.key);
    onChangeCriteria(facetKey, newValues);
  };

  const handleQueryChange = e => {
    setQuery(e.target.value || "");
  };

  return (
    <div className={classes.root}>
      <Typography
        color="textPrimary"
        variant="subtitle2"
        classes={{ root: classes.title }}
      >
        {facetInfo.label}
      </Typography>

      <TextField
        placeholder={intl.formatMessage(messages.search)}
        fullWidth
        value={query}
        onChange={handleQueryChange}
        inputProps={{
          "data-testid": `query-${facetInfo.key}`,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <div className={classes.checkboxes}>
        {optionsFiltered.map(option => (
          <FormControlLabel
            key={option.key}
            classes={{
              root: classes.checkboxWrapper,
              label: classes.checkboxLabel,
            }}
            control={
              <Checkbox
                checked={isChecked(option)}
                onChange={() => handleCheckOption(option)}
                size="small"
              />
            }
            label={`${option.label || option.key} (${option.recordCount})`}
          />
        ))}
      </div>
    </div>
  );
};

const isOptionMatching = (option, query) => {
  const value = option.label || option.key || "";
  return value.toLowerCase().includes(query.toLowerCase());
};

export default FacetFilter;
