import { stringify } from "query-string";

import { pkbUrl } from "@temp/constants";

const responseToJson = response => response.json();

const toQueryString = (queryParams = {}) => {
  const queryString = stringify(queryParams);

  return queryString && `?${queryString}`;
};

// @todo: Get from user auth0
const getHeaders = (user: any) => ({ "Accept-Language": "en" });

export const getJobTitles = (queryParams = {}, user = null) =>
  fetch(`${pkbUrl}job-titles/${toQueryString(queryParams)}`, {
    headers: getHeaders(user),
  }).then(responseToJson);

export const getJobFunctions = (queryParams = {}, user = null) =>
  fetch(`${pkbUrl}job-functions/${toQueryString(queryParams)}`, {
    headers: getHeaders(user),
  }).then(responseToJson);

export const getLocations = (queryParams = {}, user = null) =>
  fetch(`${pkbUrl}locations/${toQueryString(queryParams)}`, {
    headers: getHeaders(user),
  }).then(responseToJson);

export const getProducts = (queryParams = {}, user = null) =>
  fetch(`${pkbUrl}products/${toQueryString(queryParams)}`, {
    headers: getHeaders(user),
  }).then(responseToJson);

export default {
  getJobTitles,
  getJobFunctions,
  getLocations,
  getProducts,
};
