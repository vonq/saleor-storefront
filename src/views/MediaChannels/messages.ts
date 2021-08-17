import { defineMessages } from "react-intl";

export const messages = defineMessages({
  closeButton: {
    defaultMessage: "Close",
  },
  crossPostings: {
    defaultMessage: "Cross-postings on",
  },
  crossPostingsHint: {
    defaultMessage:
      "{channelName} will automatically post your vacancy to all applicable cross-posting channels. Because this cross-posting process is executed by {channelName} itself, they are not guaranteed.",
  },
  deliveryTime: {
    defaultMessage: "Delivery time",
  },
  exploreChannels: {
    defaultMessage: "Browse channels",
  },
  industries: {
    defaultMessage: "Industries",
  },
  jobFunctions: {
    defaultMessage: "Job functions",
  },
  learnWhy: {
    defaultMessage: "Learn why",
  },
  learnWhyLink: {
    defaultMessage:
      "https://intercom.help/vonq/en/articles/5227780-channel-sla",
  },
  locations: {
    defaultMessage: "Locations",
  },
  maxDeliveryTime: {
    defaultMessage:
      "It can take up to {maxTimeToProcess, plural, one {# working day} other {# working days}} to process your first order.",
  },
  moreInformation: {
    defaultMessage: "More information",
  },
  noOptions: {
    defaultMessage: "No options",
  },
  numberChannelsFound: {
    defaultMessage:
      "Found {totalCount, plural, =0 {no channels} =1 {one channel} other {# channels}} in the VONQ portfolio",
  },
  searchChannels: {
    defaultMessage: "Search on channels",
  },
  searchChannelsHelperText: {
    defaultMessage:
      "Search by channel name, job title, job function and location",
  },
  searchOptionType: {
    defaultMessage:
      "{type, select, channelTitle {Channel title} jobTitle {Job title} jobFunction {Job function} location {Location}}",
  },
  workingDays: {
    defaultMessage: "{days, plural, =1 {# working day} other {# working days}}",
  },
});
