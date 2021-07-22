import { stringify } from "query-string";

import { pkbUrl } from "@temp/constants";

export enum OptionType {
  ChannelTitle = "channelTitle",
  JobTitle = "jobTitle",
  JobFunction = "jobFunction",
  Location = "location",
}

export interface Option {
  type: OptionType;
  label: string;
  extraLabel?: string;
  value: string | number;
}

const fetchJobTitle = async (text: string): Promise<Option[]> => {
  const query = stringify({ text, limit: 5 });
  const headers = { "Accept-Language": "en" }; // @todo: Get from user
  const response = await fetch(`${pkbUrl}job-titles/?${query}`, { headers })
    .then(response => response.json())
    .catch(() => []);

  if (!Array.isArray(response?.results)) {
    return [];
  }

  return response.results.map(i => {
    return {
      type: OptionType.JobTitle,
      label: i.name,
      value: i.id,
    };
  });
};

const fetchJobFunctions = async (text: string): Promise<Option[]> => {
  const query = stringify({ text });
  const headers = { "Accept-Language": "en" }; // @todo: Get from user
  const response = await fetch(`${pkbUrl}job-functions/?${query}`, { headers })
    .then(response => response.json())
    .catch(() => []);

  if (!Array.isArray(response)) {
    return [];
  }

  return response.slice(0, 4).map(i => {
    return {
      type: OptionType.JobFunction,
      label: i.name,
      value: i.id,
    };
  });
};

const extractWithin = (location: any, filter: string[]) => {
  if (!location) {
    return [];
  }

  if (!Array.isArray(location.place_type)) {
    return [];
  }

  if (!filter.some(i => location.place_type.includes(i))) {
    return [];
  }

  return [location.canonical_name, ...extractWithin(location.within, filter)];
};

const fetchLocations = async (text: string): Promise<Option[]> => {
  const query = stringify({ text });
  const headers = { "Accept-Language": "en" }; // @todo: Get from user
  const response = await fetch(`${pkbUrl}locations/?${query}`, { headers })
    .then(response => response.json())
    .catch(() => []);

  if (!Array.isArray(response)) {
    return [];
  }

  return response.slice(0, 4).map(i => {
    return {
      type: OptionType.Location,
      label: i.canonical_name,
      extraLabel:
        extractWithin(i.within, ["region", "country"]).join(", ") || null,
      value: i.id,
    };
  });
};

export const fetchOptions = (searchText: string) => {
  const waitFor: Promise<Option[]>[] = [
    Promise.resolve([
      {
        type: OptionType.ChannelTitle,
        label: searchText,
        value: searchText,
      },
    ]),
    fetchJobTitle(searchText),
    fetchJobFunctions(searchText),
    fetchLocations(searchText),
  ];

  return Promise.all(waitFor).then(result => result.flat());
};
