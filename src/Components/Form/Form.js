import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
  state = {
    locations: "",
    daysOfTravel: ""
  };

  handleLocations = event => {
    this.setState({
      locations: event.target.value
    });
  };
  handleDays = event => {
    this.setState({
      daysOfTravel: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { locations, daysOfTravel } = this.state;
    return (
      <div>
        <h1 className="Head"> Tokyo Open Data Challenge</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="Outer">
            <h1 className="Title">Enter Tour Details</h1>
            <div>
              <label>Locations to visit</label>
              <input
                type="text"
                placeholder="Name of Locations"
                value={locations}
                onChange={this.handleLocations}
                multiple
              />
            </div>
            <div>
              <label>Days of Travel </label>
              <input
                type="number"
                placeholder="Number of Days"
                value={daysOfTravel}
                onChange={this.handleDays}
              />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
