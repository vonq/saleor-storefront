import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { CreateJobTitleForm } from ".";
import { ICreateJobTitleFormProps } from "./CreateJobTitleForm";

const DEFAULT_PROPS: ICreateJobTitleFormProps = {};

storiesOf("@components/organisms/CreateJobTitleForm", module)
.addParameters({ component: CreateJobTitleForm })
.addDecorator(story => (
<IntlProvider locale="en">{story()}</IntlProvider>
))
.add("default", () =>
<CreateJobTitleForm {...DEFAULT_PROPS} />);