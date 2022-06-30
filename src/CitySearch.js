import React, { Component } from "react";
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      suggestions: [],
      showSuggestions: undefined,
    };
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
    this.setState({
      query: value,
      infoText: 'Cannot find the city you are looking for. Please try another city',
    });
  } else {
    return this.setState({
      query: value,
      suggestions,
      infoText: ''
    });
  }
};

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText:''
    });

    this.props.updateEvents(suggestion);
  };

  render() {
    const { query } = this.state;
    return (
      <div className="CitySearch">
        <label className="searchcity">Select nearest city</label>{" "}
        <input
          type="text"
          className="city"
          value={query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
          placeholder="Search for a city"
        />
        <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: "none" }}>
          {this.state.suggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>
              {suggestion}
            </li>
          ))}
          <li 
          onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
        <InfoAlert text={this.state.infoText} />
      </div>
    );
  }
}

export default CitySearch;