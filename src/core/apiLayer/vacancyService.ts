import qs from "query-string";

import { vacancyBaseUrl, companyId } from "@temp/constants";

export interface VacancyItem {
  vacancyId: string;
  title: string;
  sourceName: string;
  recruiterName: string;
  regionId: string;
  createdAt: string;
}

export interface VacancyFilterCriteria {
  query: string;
  facets: {
    [key: string]: Array<string | number>
  }
}

export interface VacancyFacetItem {
  key: string;
  label: string;
  options: Array<{
    key: number;
    label: string;
    recordCount: number;
  }>;
}

export const fetchVacancyList = async filters => {
  try {
    const queryParams = stringifyPayload(filters);
    const fullUrl = `${vacancyBaseUrl}/search/vacancies/${companyId}${queryParams}`;

    let response = await fetch(fullUrl);
    response = await response.json();
    return {
      total: response["totalHits"],
      list: response["vacancies"],
    };
  } catch (err) {
    throw err;
  }
};

export const fetchVacancyFacets = async filters => {
  try {
    const queryParams = stringifyPayload(filters);
    const fullUrl = `${vacancyBaseUrl}/search/facets/${companyId}${queryParams}`;

    let response = await fetch(fullUrl);
    response = await response.json();
    return response;
  } catch (err) {
    throw err;
  }
};

const stringifyPayload = filters => {
  const { offset, limit, query, facets } = filters;
  const payload = {
    offset,
    limit,
    text: query,
    ...facets,
  };
  const stringified = qs.stringify(payload, {
    arrayFormat: "comma",
    skipEmptyString: true,
    skipNull: true,
  });

  return (stringified ? "?" : "") + stringified;
};
