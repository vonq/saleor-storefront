import { Box, makeStyles, Theme } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import * as React from "react";

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

  return (
    <Box className={classes.root}>
      <Input
        id="search-channles-text"
        placeholder="Search on channels"
        fullWidth
        value={criteria.name}
        onChange={e => onChangeCriteria({ ...criteria, name: e.target.value })}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default Sitebar;
