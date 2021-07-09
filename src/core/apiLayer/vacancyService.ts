import qs from "query-string";

const ServiceBaseUrl = "http://localhost:8082";
// @FIXME: should be pulled from account level
const CompanyId = "comp4";

export const fetchVacancyList = async filters => {
  try {
    const queryParams = stringifyPayload(filters);
    const fullUrl = `${ServiceBaseUrl}/search/vacancies/${CompanyId}${queryParams}`;

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
    const fullUrl = `${ServiceBaseUrl}/search/facets/${CompanyId}${queryParams}`;

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
