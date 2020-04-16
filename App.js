import React from 'react';

import './App.css';



import 'bootstrap/dist/css/bootstrap.min.css';

import Weather from "./app_component/weather.component";
import Form from './app_component/form.component.jsx';

//const API_key = "06414a02038c537c67836dc0a9c0b6c4";
//const API_Key = "06414a02038c537c67836dc0a9c0b6c4"

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    }
    
  }

  calCelsius(temp){
    let cell=Math.floor(temp-273.15);
    return cell;
  }

  getWeather=async(event)=>{
    event.preventDefault();

    const city=event.target.elements.city.value;
    const country=event.target.elements.country.value;

   

    const api_call=await fetch(

      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=06414a02038c537c67836dc0a9c0b6c4`
      );


    const response = await api_call.json();

    console.log(response);

    this.setState({
      city:response.name,
      country:response.sys.country,
      celsius:this.calCelsius(response.main.temp),
      temp_max:this.calCelsius(response.main.temp_max),
      temp_min:this.calCelsius(response.main.temp_min),
      description:response.weather[0].description

    });

  };


  render(){
    return(
      <div className="App">
        <Form loadweather={this.getWeather}/>
      <Weather city={this.state.city} country={this.state.country} temp_celsius={this.state.celsius} temp_max={this.state.temp_max} temp_min={this.state.temp_min} description={this.state.description}/>
     </div>
    );
  }
}

export default App;

