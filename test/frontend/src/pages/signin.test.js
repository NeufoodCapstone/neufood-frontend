import React from "react";
import { shallow, render, mount } from "enzyme";
import SignIn from "../../../../src/pages/signin";

import { configure } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("SignIn component", () => {
  it("page renders", () => {
    const wrapper = mount(<SignIn />);

    expect(wrapper.exists()).toBe(true);
  });

  it("handles form submission", () => {
    const wrapper = mount(<SignIn />);
    const form = wrapper.find("#signin-form");
    const handleSubmit = jest.fn();
    form.props().onSubmit = handleSubmit;

    form.simulate("submit");

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
