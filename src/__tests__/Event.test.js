import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test("render an event", () => {
    expect(EventWrapper.find(".event")).toHaveLength(1);
  });

  test("render the location", () => {
    expect(EventWrapper.find(".location")).toHaveLength(1);
  });

  test("render the summary", () => {
    expect(EventWrapper.find(".summary")).toHaveLength(1);
  });

  test('render the date', () => {
    expect(EventWrapper.find('.start-date')).toHaveLength(1);
  });
  //button area

  //Extra info not visible at start
  test('not render the extra info by default', () => {
    expect(EventWrapper.find('.extra-info')).toHaveLength(0);
})

//Show extra info div if btn clicked
test('render the extra info after btn click', () => {
    EventWrapper.setState({
      collapsed: false,
    });
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.find('.extra-details')).toHaveLength(0);
})

test('open extra details if button is clicked', () => {
    EventWrapper.setState({
      collapsed: true,
    });
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBeFalsy();
})

test('hide extra details if button is clicked', () => {
    EventWrapper.setState({
      collapsed: false,
    });
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBeTruthy()
})

test('change state when function isClicked is called', () => {
    EventWrapper.setState({
      collapsed: false,
    });
    EventWrapper.instance().handleClick();
    expect(EventWrapper.state('collapsed')).toBeTruthy()
})

});