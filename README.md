# meet

## Description

- meet is a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

## Key Features

### Filter events by city

- User Story :- As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city
  - Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
  - Scenario 2: User should see a list of suggestions when they search for a city.
  - Scenario 3: User can select a city from the suggested list.

### Show/hide event details.

- User Story :- As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.
  - Scenario 1: An event element is collapsed by default
  - Scenario 2: User can expand an event to see its details
  - Scenario 3: User can collapse an event to hide its details

### Specify number of events.

- User Story :- As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.
  - Scenario 1: When user hasn’t specified a number, 32 is the default number
  - Scenario 2: User can change the number of events they want to see

### Use the app when offline.

- User Story :- As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.
  - Scenario 1: Show cached data when there’s no internet connection
  - Scenario 2: Show error when user changes the settings (city, time range)

### Add an app shortcut to the home screen.

- User Story :- As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.

### View a chart showing the number of upcoming events by city.

- User Story :- As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.
  - Scenario 1: Show a chart with the number of upcoming events in each city
