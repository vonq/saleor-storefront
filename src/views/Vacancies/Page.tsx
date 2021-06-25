import * as React from "react";

import { FilterSidebar, FilterTagsHeader, VacancyList } from "./components";

import "./scss/index.scss";

interface PageProps {
  loading: boolean;
  vacancyList: Array<any>;
  onChange: (name, value) => void;
}

const Page: React.FC<PageProps> = ({ vacancyList }) => {
  return (
    <div className="vacancies-page">
      <div className="vacancies-page__sidebar">
        <FilterSidebar />
      </div>
      <div className="vacancies-page__content">
        <FilterTagsHeader />
        <VacancyList list={vacancyList} />
      </div>
    </div>
  );
};

export default Page;
