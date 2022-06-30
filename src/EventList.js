import React, { Component } from 'react';
import Event from './Event';
import { Container, Col, Row } from "react-bootstrap"

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <Container>
        <Row className="EventList">
          {events.map(event =>
            <Col key={event.id}>
              <Event event={event} />
            </Col>
          )}
        </Row>
      </Container>
      
    );
  }
}

export default EventList;