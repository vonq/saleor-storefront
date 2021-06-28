import React from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import "../scss/filter_sidebar.scss";

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
      ></Input>
    </div>
  );
};

export default FilterSidebar;
