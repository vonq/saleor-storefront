import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import _get from "lodash/get";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "1rem",
  },
  checkboxes: {},
}));

interface CompProps {
  facetDetails: number;
  searchFilters: any;
  onChangeFilters: Function;
}

export const FacetFilter: React.FC<CompProps> = ({
  facetDetails,
  searchFilters,
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const optionsFiltered = useMemo(
    () =>
      _get(facetDetails, "options", []).filter(option =>
        isOptionMatching(option, query)
      ),
    [query, facetDetails]
  );

  const isChecked = option => {
    const facetKey = facetDetails["key"];
    const activeFilter = searchFilters[facetKey] || [];
    return activeFilter.includes(option.key);
  };

  const handleCheckOption = option => {};

  const handleQueryChange = e => {
    setQuery(e.target.value || "");
  };

  return (
    <div className={classes.root}>
      <Typography color="textPrimary" variant="subtitle2">
        {facetDetails["label"]}
      </Typography>

      <TextField
        id="search-query"
        placeholder={`Search on ${facetDetails["label"]}`}
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

      <div className={classes.checkboxes}>
        {optionsFiltered.map(option => (
          <FormControlLabel
            key={option.key}
            control={
              <Checkbox
                checked={isChecked(option)}
                onChange={() => handleCheckOption(option)}
                name={option.key}
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
