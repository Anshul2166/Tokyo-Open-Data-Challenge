import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
  state = {
    locations: [],
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

  addLocation = event =>{
    this.setState({
      locations:[...this.state.locations,'']
    })
  }
  render() {
    const { locations, daysOfTravel } = this.state;
    return (
      <div>
        <h1 className="Head"> Tokyo Open Data Challenge</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="Outer">
            <h3 className="Title">Enter Tour Details</h3>
            <div>
              <label>Locations to visit</label>

              {locations.map((location, index) => {
                return (
                  <div key={index}>
                    <input 
                    // eslint-disable-next-line no-restricted-globals
                    type="number" placeholder='Enter location' value={location} onChange={this.addLocation} />
                  </div>
                );
              })}
                <hr></hr>
              <button onClick={event => this.addLocation}>Add Location</button>
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
