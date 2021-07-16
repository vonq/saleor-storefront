export interface VacancyItem {
  vacancyId: string;
  title: string;
  sourceName: string;
  recruiterName: string;
  regionId: string;
  createdAt: string;
}

export interface VacancySearchCriteria {
  query: string;
  facets: {
    [key: string]: Array<string | number>;
  };
}

export interface VacancySearchParams {
  criteria: VacancySearchCriteria;
  limit?: number;
  offset?: number;
}

export interface VacancyFacetSingle {
  key: string;
  label: string;
  options: Array<{
    key: number;
    label: string;
    recordCount: number;
  }>;
}

export interface VacancyFacetMap {
  [key: string]: VacancyFacetSingle
}
