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

  render() {
    const { location, daysOfTravel } = this.state;
    return (
      <div>
        <h1 className="Head"> Tokyo Open Data Challenge</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="Outer">
            <h3 className="Title">Enter Tour Details</h3>
            <div>
              <label>Locations to visit</label>

              {locations.map((location, index)=>{
                  return(
                    <div key={index}>

                    </div>
                  )
                })

              <input placeholder="Name of Locations"
                value={locations}
                onChange={this.handleLocations}
              />
              }
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
