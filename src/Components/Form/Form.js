import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
  state = {
    locations: [],
    daysOfTravel: ""
  };

  handleLocations = (event, index) => {
    this.state.locations[index] = event.target.value;
    this.setState({ locations: this.state.locations });
  };
  handleDays = event => {
    this.setState({
      daysOfTravel: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state, "+");
  };

  addLocation = () => {
    this.setState({
      locations: [...this.state.locations, ""]
    });
  };

  removeLocation = index => {
    this.state.locations.splice(index, 1);
    this.setState({ locations: this.state.locations });
  };

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
                      type="text"
                      placeholder="Enter location"
                      value={location}
                      onChange={event => this.handleLocations(event, index)}
                    />
                    <button id='remove' className='button' onClick={event => this.removeLocation(event)}>
                      Remove
                    </button>
                  </div>
                );
              })}

              <button id='add' className='button' onClick={event => this.addLocation(event)}>
                Add Location
              </button>
            </div>
            <div>
              <label >Days of Travel </label>
              <input
                type="number"
                placeholder="Number of Days"
                value={daysOfTravel}
                onChange={this.handleDays}
              />
            </div>
            <button type="submit" className='button' onClick={event => this.handleSubmit(event)}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
