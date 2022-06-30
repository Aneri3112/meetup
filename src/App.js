import { React, Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

import './nprogress.css';
  
class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    location: 'all',
    showWelcomeScreen: undefined 
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount = this.state.numberOfEvents) => {
    this.mounted = true;
    getEvents().then((events) => {
      const locationEvents =
        location === "all" ? events : events.filter((event) => event.location === location);
      const eventNumberFilter =
        eventCount > locationEvents.length ? locationEvents : locationEvents.slice(0, eventCount);
      if (this.mounted) {
        this.setState({
          events: eventNumberFilter,
        });
      }
    });
  };
  
  updateEventNumbers = (eventNumbers) => {
    this.setState({
      numberOfEvents: eventNumbers,
    });
    this.updateEvents(this.state.location, eventNumbers);
  };
  
  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined &&
      navigator.onLine &&
      !window.location.href.startsWith("http://localhost")
      ) {
        return <div className="App" />;
      }
      if (this.state.showWelcomeScreen === true)
      return (
        <WelcomeScreen 
          showWelcomeScreen={this.state.showWelcomeScreen} 
          getAccessToken={() => { 
            getAccessToken() 
          }} 
        />
      );

    return (
      <div className="App">
          <Navbar sticky="top" bg="light" expand="lg" variant="light" className="mb-3">
          <Container fluid>
            <Navbar.Brand id="navbrand" href="/">Meet</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link>
                  {" "}
                    <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                </Nav.Link>
                <Nav.Link>
                  {" "}
                  <NumberOfEvents  updateEventNumbers={this.updateEventNumbers} />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>

        { !navigator.onLine && <OfflineAlert text={'You are currently offline, data may be not updated.'}/> }
        <Container md={12} lg={6}>
          <Row>
            <Col className='centerElements'>
              <h4>Popularity of events</h4>
              <EventGenre events={this.state.events} />
            </Col>

            <Col className='centerElements'>
              <h4>Events in each city</h4>
                <ResponsiveContainer height={400} minWidth={400}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10, }} >
                    <CartesianGrid  strokeDasharray="3 3" />
                    <XAxis type="category" dataKey="city" name="City" />
                    <YAxis type="number" dataKey="number" name="Number of events" allowDecimals={false} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={this.getData()} fill="#FFC898" />
                  </ScatterChart>
                </ResponsiveContainer> 
            </Col>
        </Row>
        </Container>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;