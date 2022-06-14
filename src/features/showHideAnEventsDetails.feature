Feature: show/hide an event's details

  Scenario: An event element is collapsed by default.
    Given the app was closed
    When the user opens the app
    Then the user will see a list of events each with the details collapsed

  Scenario: User can expand an event to see its details.
    Given there is a list of upcoming events
    When the user clicks the “show details” of a particular event
    Then then the user will see more details of that event

  Scenario: User can collapse an event to hide its details.
    Given the user has expanded the details of an event
    When the user clicks the hide details button
    Then the event details will collapse and the user will see only the detail overview