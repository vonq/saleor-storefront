import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

// import { MemoryRouter } from "react-router";
import { WorkAddressForm } from ".";
import { IWorkAddressFormProps } from "./WorkAddressForm";

const DEFAULT_PROPS: IWorkAddressFormProps = {};

storiesOf("@components/organisms/WorkAddressForm", module)
  .addParameters({ component: WorkAddressForm })
  .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
  .add("default", () => <WorkAddressForm {...DEFAULT_PROPS} />);
