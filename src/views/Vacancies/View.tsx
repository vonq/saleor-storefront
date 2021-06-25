import { NextPage } from "next";
import * as React from "react";
import { useQueryParam } from "use-query-params";

import { fetchVacancies } from "@temp/core/apiLayer/vacancyService";

import Page from "./Page";
import { Loader } from "@temp/components";

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach(value => {
      str.push(`${value}_${valueObj[value].join("_")}`);
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue.split(".").filter(n => n);
    propsWithValues.map(value => {
      const propWithValues = value.split("_").filter(n => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

export const View: NextPage = () => {
  // const [searchText, setSearchText] = useQueryParam("text", StringParam);
  const [facetFilters, setFacetFilters] = useQueryParam(
    "facets",
    FilterQuerySet
  );
  const [loading, setLoading] = React.useState(false);
  const [vacancyList, setVacancyList] = React.useState([]);

  const filters = {
    searchText: "",
    facets: facetFilters,
    limit: 25,
    offset: 0,
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchVacancies();
      console.log("========", response);
      setVacancyList(response["list"]);
      // const { total, facets, list } = fetchVacancies();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // const clearFilters = () => {
  //   setFacetFilters({});
  // };

  const onFacetsChange = (name, value) => {
    if (facetFilters && facetFilters.hasOwnProperty(name)) {
      if (facetFilters[name].includes(value)) {
        if (filters.facets[`${name}`].length === 1) {
          const att = { ...facetFilters };
          delete att[`${name}`];
          setFacetFilters({
            ...att,
          });
        } else {
          setFacetFilters({
            ...facetFilters,
            [`${name}`]: facetFilters[`${name}`].filter(item => item !== value),
          });
        }
      } else {
        setFacetFilters({
          ...facetFilters,
          [`${name}`]: [...facetFilters[`${name}`], value],
        });
      }
    } else {
      setFacetFilters({ ...facetFilters, [`${name}`]: [value] });
    }
  };

  return (
    <Page loading={loading} onChange={onFacetsChange} vacancyList={vacancyList} />
  );
};

export default View;
