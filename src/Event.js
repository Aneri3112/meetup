import React, { Component } from "react";
import { Card, CardGroup, Button } from "react-bootstrap";
import './App.css';

class Event extends Component {
  state = {
    collapsed: true,
  };

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="event">
        <CardGroup>
          <Card className="event-card">
            <Card.Title className="summary">{event.summary}</Card.Title>
            <Card.Subtitle className="start-date"> {event.start.dateTime} ({event.start.timeZone}) </Card.Subtitle>
            <Card.Subtitle className="location"> @{event.summary} | {event.location} </Card.Subtitle>

            <Button
              variant="outline-info"
              className= "details-button"
              onClick={this.handleClick}
            >
              {collapsed ? "Show Details" : "Hide Details"}
            </Button>

            {!collapsed && (
              <div className= "extra-details" >
              
                <Card.Title>About the event:</Card.Title>
                <a href={event.htmlLink} rel="noreferrer" target="_blank">
                  See details on Google Calendar
                </a>
                <p className="event-description">{event.description}</p>
              </div>
            )}
          </Card>
        </CardGroup>
      </div>
    );
  }
}

export default Event;