import { defineMessages } from "react-intl";

export const messages = defineMessages({
  startCampaign: { defaultMessage: "Start Campaign" },
  searchVacancies: { defaultMessage: "Search on vacancies" },
  searchResults: { defaultMessage: "Search Results" },
  searchResultCount: {
    defaultMessage:
      "{totalCount, plural, =0 {no vacancies} =1 {one vacancy} other {# vacancies}}",
  },
  filterBy: { defaultMessage: "Filter By" },
  filters: { defaultMessage: "Filters" },
});

export default messages;
