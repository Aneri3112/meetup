import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {

  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppWrapper;
    given('the app was closed', () => {

    });

    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user will see a list of events each with the details collapsed', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').hostNodes()).toHaveLength(
        mockData.length
      );
      expect(AppWrapper.find('.extra-info')).toHaveLength(0);
    }
  );
});


test('User can expand an event to see its details.', ({ given, when, then }) => {
  let AppWrapper = mount(<App />);
    given('there is a list of upcoming events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });

    when('the user clicks the “show details” of a particular event', () => {
      AppWrapper.find('.details-button').at(0).simulate('click');
    });

    then('then the user will see more details of that event', () => {
      expect(AppWrapper.find('.extra-details')).toBeTruthy();
    });
});



test('User can collapse an event to hide its details.', ({ given, when, then }) => {
  let AppWrapper;
    given('the user has expanded the details of an event', async() => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.details-button').at(0).simulate('click');
    });

    when('the user clicks the hide details button', () => {
      AppWrapper.update();
      AppWrapper.find('.details-button').at(0).simulate('click');
    });

    then('the event details will collapse and the user will see only the detail overview', () => {
      expect(AppWrapper.find('.extra-info')).toHaveLength(0);
    });
});
});