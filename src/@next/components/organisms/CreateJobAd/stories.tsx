import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { CreateJobAd } from ".";
import { ICreateJobAdProps } from "./CreateJobAd";

const DEFAULT_PROPS: ICreateJobAdProps = {};

storiesOf("@components/organisms/CreateJobAd", module)
  .addParameters({ component: CreateJobAd })
  .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
  .add("default", () => <CreateJobAd {...DEFAULT_PROPS} />);
