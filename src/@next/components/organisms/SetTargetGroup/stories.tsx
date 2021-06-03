import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { SetTargetGroup } from ".";
import { ISetTargetGroupProps } from "./SetTargetGroup";

const DEFAULT_PROPS: ISetTargetGroupProps = {
  onSubmitSuccess: () => {},
  changeSubmitProgress: () => {},
};

storiesOf("@components/organisms/SetTargetGroup", module)
  .addParameters({ component: SetTargetGroup })
  .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
  .add("default", () => <SetTargetGroup {...DEFAULT_PROPS} />);
