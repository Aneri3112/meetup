import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('render event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('render title', () => {
    expect(EventWrapper.find('.title')).toHaveLength(1);
  });

  test('render start time', () => {
    expect(EventWrapper.find('.start-time')).toHaveLength(1);
  });

  test('render location', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
  });

  test('render button for details', () => {
    expect(EventWrapper.find('.btn-details')).toHaveLength(1);
  });

  test('event is collapsed by default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test('expand event details on click', () => {
    EventWrapper.setState({ collapsed: true });
    EventWrapper.find('.btn-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('collapse event details on click', () => {
    EventWrapper.setState({ collapsed: false });
    EventWrapper.find('.btn-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });
});