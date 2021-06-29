import "./scss/index.scss";

import * as React from "react";

import { FilterSidebar, FilterTagsHeader, VacancyList } from "./components";

interface PageProps {
  loading: boolean;
  vacancyItems: Array<any>;
}

const VacanciesPageView: React.FC<PageProps> = ({ loading, vacancyItems }) => {
  return (
    <div className="vacancies-page">
      <div className="vacancies-page__sidebar">
        <FilterSidebar />
      </div>
      <div className="vacancies-page__content">
        <FilterTagsHeader />
        <VacancyList items={vacancyItems} />
      </div>
    </div>
  );
};

export default VacanciesPageView;
