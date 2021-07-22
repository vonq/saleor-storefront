import * as pkbApi from "@temp/core/apiLayer/pkbApi";

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

const LIMIT = 5;

const getJobTitles = async (text: string): Promise<Option[]> => {
  const response = await pkbApi
    .getJobTitles({ text, limit: LIMIT })
    .catch(() => null);

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

const getJobFunctions = async (text: string): Promise<Option[]> => {
  const response = await pkbApi.getJobFunctions({ text }).catch(() => null);

  if (!Array.isArray(response)) {
    return [];
  }

  return response.slice(0, LIMIT).map(i => {
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

const getLocations = async (text: string): Promise<Option[]> => {
  const response = await pkbApi.getLocations({ text }).catch(() => null);

  if (!Array.isArray(response)) {
    return [];
  }

  return response.slice(0, LIMIT).map(i => {
    return {
      type: OptionType.Location,
      label: i.canonical_name,
      extraLabel:
        extractWithin(i.within, ["region", "country"]).join(", ") || null,
      value: i.id,
    };
  });
};

export const getOptions = (searchText: string) => {
  const waitFor: Promise<Option[]>[] = [
    Promise.resolve([
      {
        type: OptionType.ChannelTitle,
        label: searchText,
        value: searchText,
      },
    ]),
    getJobTitles(searchText),
    getJobFunctions(searchText),
    getLocations(searchText),
  ];

  return Promise.all(waitFor).then(result => result.flat());
};
