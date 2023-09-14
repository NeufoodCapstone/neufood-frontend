import React from "react";
import { shallow, render, mount } from "enzyme";
import Pantry from "../../../../src/pages/pantry";

import { configure } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("Pantry component", () => {
  it("page renders", () => {
    const wrapper = mount(<Pantry />);

    expect(wrapper.exists()).toBe(true);
  });
});
