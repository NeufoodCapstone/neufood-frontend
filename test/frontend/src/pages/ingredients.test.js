import React from "react";
import { shallow, render, mount } from "enzyme";
import Ingredients from "../../../../src/pages/ingredients";

import { configure } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("Ingredients component", () => {
  it("page renders", () => {
    const wrapper = mount(<Ingredients />);

    expect(wrapper.exists()).toBe(true);
  });
});
