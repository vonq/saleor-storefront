import { Chip, Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import throttle from "lodash/throttle";
import * as React from "react";
import { FC, useMemo } from "react";
import { useIntl } from "react-intl";

import { SearchProductCriteria } from "@temp/core/apiLayer/productService";

import { getOptions, Option, OptionType } from "../getOptions";
import { messages } from "../messages";

/**
 * Make sure `options` contains:
 *  - only one JobFunction or JobTitle
 *  - only one Location
 *  - only one ChannelTitle
 *
 *  Remove extra options, preserve the last added one
 */
const normalizeOptions = (options: Option[]) =>
  // Reverse the array that way we can easily remove the older ones
  options.reverse().reduce(
    (state, option) => {
      if (
        state.seenTypes[option.type] ||
        (option.type === OptionType.JobFunction && state.seenTypes.jobTitle) ||
        (option.type === OptionType.JobTitle && state.seenTypes.jobFunction)
      ) {
        return state;
      }

      state.seenTypes[option.type] = true;
      state.options.unshift(option);

      return state;
    },
    {
      options: [] as Option[],
      seenTypes: {
        channelTitle: false,
        jobTitle: false,
        jobFunction: false,
        location: false,
      },
    }
  ).options;

const toSearchProductCriteria = (options: Option[]): SearchProductCriteria => {
  return options.reduce<SearchProductCriteria>((acc, option) => {
    switch (option.type) {
      case OptionType.ChannelTitle:
        return { ...acc, name: String(option.value) };
      case OptionType.JobFunction:
        return { ...acc, jobFunctionId: Number(option.value) };
      case OptionType.JobTitle:
        return { ...acc, jobTitleId: Number(option.value) };
      case OptionType.Location:
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

  const fetch = useMemo(
    () =>
      throttle((searchText, callback: (results: Option[]) => void) => {
        getOptions(searchText).then(results => callback(results));
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value.length > 0 ? value : []);
      return undefined;
    }

    fetch(inputValue, results => {
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
      autoHighlight
      getOptionLabel={option => option.label}
      groupBy={option =>
        intl.formatMessage(messages.searchOptionType, { type: option.type })
      }
      filterOptions={x => x}
      options={options}
      noOptionsText={intl.formatMessage(messages.noOptions)}
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
          helperText={intl.formatMessage(messages.searchChannelsHelperText)}
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
                {": "}
                <strong>
                  {option.extraLabel
                    ? `${option.label}, ${option.extraLabel}`
                    : option.label}
                </strong>
              </>
            }
            {...getTagProps({ index })}
          />
        ))
      }
      renderOption={(option: Option) => (
        <Grid container>
          <Grid item xs>
            <Typography variant="body1" component="p">
              {option.label}
            </Typography>
            {option.extraLabel && (
              <Typography variant="body2" color="textSecondary" component="p">
                {option.extraLabel}
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    />
  );
};

export default GlobalSearch;