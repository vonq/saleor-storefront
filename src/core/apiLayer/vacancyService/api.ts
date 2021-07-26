import { stringify } from "query-string";

import { companyId, vacancyBaseUrl } from "@temp/constants";

import { VacancySearchParams } from "./types";

const stringifyPayload = ({ offset, limit, criteria }: VacancySearchParams) => {
  const payload = {
    offset,
    limit,
    text: criteria.query,
    ...criteria.facets,
  };
  const stringified = stringify(payload, {
    arrayFormat: "comma",
    skipEmptyString: true,
    skipNull: true,
  });

  return (stringified ? "?" : "") + stringified;
};

export const fetchVacancyList = (searchParams: VacancySearchParams) => {
  const queryString = stringifyPayload(searchParams);

  return fetch(
    `${vacancyBaseUrl}/search/vacancies/${companyId}${queryString}`
  ).then(response => response.json());
};

export const fetchVacancyFacets = (searchParams: VacancySearchParams) => {
  const queryString = stringifyPayload(searchParams);

  return fetch(
    `${vacancyBaseUrl}/search/facets/${companyId}${queryString}`
  ).then(response => response.json());
};
