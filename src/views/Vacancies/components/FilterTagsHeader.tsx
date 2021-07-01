import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Typography } from "@material-ui/core";
import _get from "lodash/get";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "1.5rem",
  },
  title: {
    textTransform: "uppercase",
  },
  tag: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));
interface CompProps {
  facetGroups: any;
  facetFilters: any;
  onChangeFilters: Function;
}

export const FilterTagsHeader: React.FC<CompProps> = ({
  facetGroups,
  facetFilters,
  onChangeFilters,
}) => {
  const classes = useStyles();
  const tags = useMemo(() => flattenFacets({ facetFilters, facetGroups }), [
    facetFilters,
    facetGroups,
  ]);

  const handleTagDelete = (facetKey, value) => {
    const values = facetFilters[facetKey] || [];
    const newValues = values.includes(value)
      ? values.filter(e => e !== value)
      : values.concat(value);
    onChangeFilters(facetKey, newValues);
  };

  return (
    <div className={classes.root}>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        className={classes.title}
        gutterBottom
      >
        Filters
      </Typography>

      <div>
        {tags.map(tag => (
          <FilterTag
            key={`${tag.facetKey}-${tag.value}`}
            {...tag}
            onDelete={handleTagDelete}
            className={classes.tag}
          />
        ))}
      </div>
    </div>
  );
};

const FilterTag = ({ facetKey, value, label, onDelete, className }) => {
  const handleDelete = () => {
    onDelete(facetKey, value);
  };

  return (
    <Chip
      onDelete={handleDelete}
      label={label}
      size="small"
      classes={{ root: className }}
    />
  );
};

const flattenFacets = ({ facetFilters, facetGroups }) => {
  let tags = [];
  const findLabel = (facetKey, value) => {
    const group = facetGroups.find(e => e.key === facetKey);
    const option = _get(group, "options", []).find(e => e.key === value);
    return option ? option.label || option.key : "";
  };
  for (let key in facetFilters) {
    for (let value of facetFilters[key]) {
      tags.push({
        facetKey: key,
        value: value,
        label: findLabel(key, value),
      });
    }
  }
  return tags;
};

export default FilterTagsHeader;
