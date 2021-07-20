import { defineMessages } from "react-intl";

export const messages = defineMessages({
  exploreChannels: { defaultMessage: "Browse channels" },
  numberChannelsFound: {
    defaultMessage:
      "Found {totalCount, plural, =0 {no channels} =1 {one channel} other {# channels}} in the VONQ portfolio",
  },
  searchChannels: { defaultMessage: "Search on channels" },
  moreInformation: { defaultMessage: "More information" },
  searchOptionType: {
    defaultMessage:
      "{type, select, channelTitle {Channel title} jobTitle {Job title} jobFunction {Job function} location {Location}}",
  },
});
