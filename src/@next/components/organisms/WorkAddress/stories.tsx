import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { WorkAddress } from ".";
import { IWorkAddressProps } from "./WorkAddress";

const DEFAULT_PROPS: IWorkAddressProps = {
  changeSubmitProgress: () => {},
  onSubmitSuccess: () => {},
};

storiesOf("@components/organisms/WorkAddress", module)
  .addParameters({ component: WorkAddress })
  .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
  .add("default", () => <WorkAddress {...DEFAULT_PROPS} />);
