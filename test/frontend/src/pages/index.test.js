import React from "react";
import { shallow, render, mount } from "enzyme";
import Home from "../../../../src/pages/index";

import { configure } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("Home component", () => {
  it("page renders", () => {
    const wrapper = mount(<Home />);

    expect(wrapper.exists()).toBe(true);
  });
});
