import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Typography } from "@material-ui/core";
import _get from "lodash/get";

import {
  VacancySearchCriteria,
  VacancyFacetMap,
} from "@temp/core/apiLayer/vacancyService";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  title: {
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightBold,
  },
  tag: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));
interface CompProps {
  facetGroups: VacancyFacetMap;
  criteria: VacancySearchCriteria;
  onChangeCriteria: Function;
}

export const FilterTagsHeader: React.FC<CompProps> = ({
  facetGroups,
  criteria,
  onChangeCriteria,
}) => {
  const classes = useStyles();
  const tags = flattenFacets(criteria, facetGroups);

  const handleTagDelete = (facetKey, value) => {
    const values = criteria.facets[facetKey] || [];
    const newValues = values.includes(value)
      ? values.filter(e => e !== value)
      : values.concat(value);
    onChangeCriteria(facetKey, newValues);
  };

  if (!tags.length) {
    return null;
  }

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

const flattenFacets = (
  criteria: VacancySearchCriteria,
  facetGroups: VacancyFacetMap
) => {
  const findLabel = (facetKey, value) => {
    const option = _get(facetGroups, [facetKey, "options"], []).find(
      e => e.key === value
    );
    return option ? option.label || option.key : "";
  };

  const { facets } = criteria;
  let tags = [];

  for (let key in facets) {
    for (let value of facets[key]) {
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
