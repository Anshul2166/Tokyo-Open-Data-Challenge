import React, {Component} from 'react';
import './Form.css'
class Form extends Component{

  constructor(props) {
    super(props)
  
    this.state = {
      locations: '',
      daysOfTravel:''
    }
  }
  
  handleLocations= (event) =>{
    this.setState({
      locations: event.target.value
    })
  }
  handleDays= (event) =>{
    this.setState({
      daysOfTravel: event.target.value
    })
  }

  handleSubmit= event =>{
    event.preventDefault()
  }

  render(){
    const {locations, daysOfTravel}= this.state
    return(
      
      
      <form onSubmit={this.handleSubmit}>
      <h1 className="Head"> Tokyo Open Data Challenge</h1>
      <div className='Outer'>
        <h1 className='Title'>Enter Tour Details</h1>
          <div>
            <label>Locations to visit</label>
            <input type='text' placeholder="Name of Locations" value={locations} onChange={this.handleLocations} multiple />
          </div>
          <div>
          <label>Days of Travel </label>
            <input type='number' placeholder='Number of Days' value={daysOfTravel} onChange={this.handleDays} />
          </div>
          <button type="submit">Submit</button>
      </div>
      </form>
    )
  }

}

export default Form;
