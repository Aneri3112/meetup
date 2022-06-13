import React, { Component } from 'react';

class Event extends Component {
  state = {
    collapsed: true,
  };

  handleClick = () => {
    this.state.collapsed
      ? this.setState({ collapsed: false })
      : this.setState({ collapsed: true });
  };

  render() {
    const {event} = this.props;
    return (
      <div className="event">
        <h3 className="title">{event.summary}</h3>
        <p className="start-time">{event.start.dateTime} {event.start.timeZone} </p>
        <p className="location">{event.location}</p>
        <button className="btn-details" onClick={this.handleClick}>
          show details
        </button>
      </div>
    );
  }
}
export default Event;