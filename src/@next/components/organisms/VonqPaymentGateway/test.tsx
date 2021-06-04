import "jest-styled-components";

import { mount } from "enzyme";
import React from "react";

import { VonqPaymentGateway } from ".";

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

describe("<VonqPaymentGateway />", () => {
  it("renders with statuses", () => {
    const processPayment = jest.fn();
    const wrapper = mount(
      <VonqPaymentGateway config={config} processPayment={processPayment} />
    );

    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.text()).toContain(config[0].field);
    expect(wrapper.text()).toContain(config[1].field);
    // const getValue = (n: number) => wrapper.find("input").at(n).prop("value");
    // expect(getValue(0)).toEqual(statuses[0].token);
    // expect(getValue(1)).toEqual(statuses[1].token);
    // expect(getValue(2)).toEqual(statuses[2].token);
  });

  it("simulates select and submit events", done => {
    const formRef = React.createRef<HTMLFormElement>();

    const processPayment = jest.fn().mockResolvedValueOnce({});
    const wrapper = mount(
      <VonqPaymentGateway
        config={config}
        formRef={formRef}
        processPayment={processPayment}
      />
    );

    const input = wrapper.find("input").at(0);
    const form = wrapper.find("form");
    const { field: token } = config[0];

    input.simulate("change", {
      target: { value: token },
    });
    form.simulate("submit");

    // delay checking the assertion since Formik handler within component is evaluated asynchronously
    window.setTimeout(() => {
      expect(processPayment).toHaveBeenCalledWith(token);
      done();
    }, 0);
  });
});
