import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';

const feature = loadFeature("./src/features/SpecifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  
  test('When user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {
    given('the user is on the main page of the app', () => {

    });
    let AppWrapper;
    when('the user hasn’t specified a number of events', () => {
      AppWrapper = shallow(<App />);
    });

    then(/^the default number of displayed events will be (\d+) \((\d+) with local test\) at once$/, (arg0, arg1) => {
      expect(AppWrapper.state('numberOfEvents')).toEqual(32);
    });
});


test('User can change the number of events they want to see.', ({ given, when, then }) => {
  let AppWrapper;
    given('the user is on the main page', async() => {
      AppWrapper = await mount(<App />);
    });

    when('the user set a number of events he or she wants to see in the “Number of events” box', () => {
      AppWrapper.update();
        const eventObject = { target: { value: 1 } };
        AppWrapper.find(".numberOfEvents__input").simulate("change", eventObject);
    });

    then('this number of events will be displayed', () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(1);
    });
});
});