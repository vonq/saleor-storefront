import { Chip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _get from "lodash/get";
import React from "react";
import { useIntl } from "react-intl";

import {
  VacancyFacetMap,
  VacancySearchCriteria,
} from "@temp/core/apiLayer/vacancyService";

import messages from "../messages";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    width: "100%",
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

export const ActiveFilterTags: React.FC<CompProps> = ({
  facetGroups,
  criteria,
  onChangeCriteria,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const tagList = React.useMemo(() => flattenFacets(criteria, facetGroups), [
    criteria,
    facetGroups,
  ]);

  const handleTagDelete = (facetKey, value) => {
    const values = criteria.facets[facetKey] || [];
    const newValues = values.includes(value)
      ? values.filter(e => e !== value)
      : values.concat(value);
    onChangeCriteria(facetKey, newValues);
  };

  if (!tagList.length) {
    return null;
  }

  return (
    <div className={classes.root} data-testid="active-filter-tags">
      <Typography
        color="textSecondary"
        variant="subtitle2"
        className={classes.title}
        gutterBottom
      >
        {intl.formatMessage(messages.filters)}
      </Typography>

      <div>
        {tagList.map(tag => (
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

  return Object.entries(criteria.facets).reduce((tagList, current) => {
    const [facetKey, facetValues] = current;

    facetValues.forEach(value => {
      tagList.push({
        facetKey,
        value,
        label: findLabel(facetKey, value),
      });
    });

    return tagList;
  }, []);
};

export default ActiveFilterTags;
