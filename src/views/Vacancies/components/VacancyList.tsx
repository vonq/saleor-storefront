import React from "react";
import VacancyListItem from "./VacancyListItem";

interface CompProps {
  items: Array<any>;
}

export const VacanciesList: React.FC<CompProps> = ({ items = [] }) => {
  return (
    <div className="vacancy-list">
      {items.map(item => (
        <VacancyListItem key={item["vacancyId"]} data={item} />
      ))}
    </div>
  );
};

export default VacanciesList;
