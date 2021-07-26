import { Box, makeStyles, Theme } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import * as React from "react";
import { useRef, useState } from "react";
import { useIntl } from "react-intl";

import { messages } from "../messages";

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.sidebar,
    minHeight: "100%",
    padding: theme.spacing(4),
    borderRight: `1px solid ${theme.palette.grey["300"]}`,
  },
}));

interface SitebarProps {
  criteria: { name?: string };
  onChangeCriteria: (criteria: any) => void;
}

export const Sitebar: React.FC<SitebarProps> = ({
  criteria,
  onChangeCriteria,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [searchText, setSearchText] = useState(criteria.name);
  const timer = useRef<number>();

  const onChange = e => {
    const name = e.target.value;
    setSearchText(name);

    if (timer.current !== null) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      timer.current = null;

      onChangeCriteria({ ...criteria, name });
    }, 1200);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (timer.current !== null) {
      clearTimeout(timer.current);
    }

    onChangeCriteria({ ...criteria, name: searchText });
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={onSubmit}>
        <Input
          id="search-channles-text"
          placeholder={intl.formatMessage(messages.searchChannels)}
          fullWidth
          value={searchText}
          onChange={onChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </form>
    </Box>
  );
};

export default Sitebar;
