import React from "react";

import VacancyListItem from "./VacancyListItem";
import "../scss/vacancy_list.scss";

interface CompProps {
  list: Array<any>;
}

export const VacanciesList: React.FC<CompProps> = ({ list = [] }) => {
  return (
    <div className="vacancy-list">
      {list.map(item => (
        <VacancyListItem key={item["vacancy_id"]} {...item} />
      ))}
    </div>
  );
};

export default VacanciesList;
