import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { VonqPaymentGateway } from ".";

const processPayment = action("processPayment");

const config = [
  {
    field: "contract_1",
    value: '{"balance": 100.0}',
    __typename: "GatewayConfigLine",
  },
  {
    field: "contract_2",
    value: '{"balance": 100.0}',
    __typename: "GatewayConfigLine",
  },
];

storiesOf("@components/organisms/VonqPaymentGateway", module)
  .addParameters({ component: VonqPaymentGateway })
  .add("default", () => (
    <VonqPaymentGateway config={config} processPayment={processPayment} />
  ));
