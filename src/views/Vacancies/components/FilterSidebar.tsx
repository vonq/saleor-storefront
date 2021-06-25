import React from "react";

import { Input } from "@components/atoms";
import "../scss/filter_sidebar.scss";

export const FilterSidebar: React.FC = ({}) => {
  return (
    <div className="filter-sidebar">
      <Input placeholder="Search on vacancies" />
    </div>
  );
};

export default FilterSidebar;
