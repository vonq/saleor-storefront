import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { stringify } from "query-string";
import * as React from "react";
import { FC } from "react";
import { useIntl } from "react-intl";

import { pkbUrl } from "@temp/constants";
import { SearchProductCriteria } from "@temp/core/apiLayer/productService";
import { messages } from "@temp/views/MediaChannels/messages";

export interface Option {
  type: "channelTitle" | "jobTitle" | "jobFunction" | "location";
  label: string;
  extraLabel?: string;
  value: string | number;
}

const fetchJobTitle = async (text: string): Promise<Option[]> => {
  const query = stringify({ text, limit: 5 });
  const response = await fetch(`${pkbUrl}job-titles/?${query}`)
    .then(response => response.json())
    .catch(() => []);

  if (!Array.isArray(response?.results)) {
    return [];
  }

  return response.results.map(i => {
    return {
      type: "jobTitle",
      label: i.name,
      value: i.id,
    };
  });
};

const fetchJobFunctions = async (text: string): Promise<Option[]> => {
  const query = stringify({ text });
  const response = await fetch(`${pkbUrl}job-functions/?${query}`)
    .then(response => response.json())
    .catch(() => []);

  if (!Array.isArray(response)) {
    return [];
  }

  return response.slice(0, 4).map(i => {
    return {
      type: "jobFunction",
      label: i.name,
      value: i.id,
    };
  });
};

const fetchLocations = async (text: string): Promise<Option[]> => {
  const query = stringify({ text });
  const response = await fetch(`${pkbUrl}locations/?${query}`)
    .then(response => response.json())
    .catch(() => []);

  if (!Array.isArray(response)) {
    return [];
  }

  return response.slice(0, 4).map(i => {
    return {
      type: "location",
      label: i.canonical_name,
      value: i.id,
    };
  });
};

const fetchOptions = (searchText: string) => {
  const waitFor: Promise<Option[]>[] = [
    Promise.resolve([
      {
        type: "channelTitle",
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

const normalizeOptions = (options: Option[]) =>
  options.reverse().reduce(
    (acc, option) => {
      if (
        acc[option.type] ||
        (option.type === "jobFunction" && acc.jobTitle) ||
        (option.type === "jobTitle" && acc.jobFunction)
      ) {
        return acc;
      }

      acc[option.type] = true;
      acc.options.unshift(option);

      return acc;
    },
    {
      options: [] as Option[],
      channelTitle: false,
      jobTitle: false,
      jobFunction: false,
      location: false,
    }
  ).options;

const toSearchProductCriteria = (options: Option[]): SearchProductCriteria => {
  return options.reduce<SearchProductCriteria>((acc, option) => {
    switch (option.type) {
      case "channelTitle":
        return { ...acc, name: String(option.value) };
      case "jobFunction":
        return { ...acc, jobFunctionId: Number(option.value) };
      case "jobTitle":
        return { ...acc, jobTitleId: Number(option.value) };
      case "location":
        return { ...acc, includeLocationId: Number(option.value) };
      default:
        return acc;
    }
  }, {});
};

interface GlobalSearchProps {
  criteria: SearchProductCriteria;
  onChangeCriteria: (criteria: SearchProductCriteria) => void;
}

export const GlobalSearch: FC<GlobalSearchProps> = ({ onChangeCriteria }) => {
  const intl = useIntl();
  const [value, setValue] = React.useState<Option[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<Option[]>([]);

  React.useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value.length > 0 ? value : []);
      return undefined;
    }

    fetchOptions(inputValue).then(results => {
      if (active) {
        setOptions(results.length > 0 ? [...value, ...results] : value);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      multiple
      getOptionLabel={option => option.label}
      groupBy={option =>
        intl.formatMessage(messages.searchOptionType, { type: option.type })
      }
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      fullWidth
      onChange={(event: any, newValue: Option[]) => {
        const normalizedNewValue = normalizeOptions(newValue);
        onChangeCriteria(toSearchProductCriteria(normalizedNewValue));
        setOptions([...normalizedNewValue, ...options]);
        setValue(normalizedNewValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={intl.formatMessage(messages.searchChannels)}
          variant="outlined"
          fullWidth
        />
      )}
      renderTags={(value: Option[], getTagProps) =>
        value.map((option: Option, index: number) => (
          <Chip
            variant="outlined"
            label={
              <>
                {intl.formatMessage(messages.searchOptionType, {
                  type: option.type,
                })}
                : <strong>{option.label}</strong>
              </>
            }
            {...getTagProps({ index })}
          />
        ))
      }
    />
  );
};

export default GlobalSearch;
