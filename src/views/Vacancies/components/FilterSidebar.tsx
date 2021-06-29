import "../scss/filter_sidebar.scss";

import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";

export const FilterSidebar: React.FC = ({}) => {
  return (
    <div className="filter-sidebar">
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
