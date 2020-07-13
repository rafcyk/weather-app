import React from 'react';
import './App.css';
import tempIcon from './images/temp-icon.png'

// 81EEBfDFd0bFaDafce024Ab067f9DAA6fD1DCeF9C4458375Aabf4EE0EA8AeE857C83eDa

class App extends React.Component {
    state = {
      city: '',
      description: '',
      temperature: '',
      tempCode: ' &#8451:',
      image: '',
      city_name: ''
    }

  handleClick = (e) =>{
    e.preventDefault();

    if(this.state.city.trim() === ''){
      alert('Please enter city name :)')
    } else {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=d4fe046e07dbf46eb0aca2cd7e5ddab8`)
      .then(res => res.json())
      .then(
        (data) => {

          if(data.cod === 200){
            this.setState({
              description:data.weather[0].description,
              temperature: data.main.temp,
              image: data.weather[0].icon,
              city_name: this.state.city.trim().toLowerCase(),
              city: ''
            })
          } else{
            this.setState({
              description: data.message + ' :(',
              temperature: '',
              city_name: this.state.city.trim().toLowerCase(),
              city: '',
              image: ''
          })
        }
            
        })
    }
  }

  handleChange = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  render(){
    return (
      <div className="app">
        <div className = 'header-container'><h1>Weather App</h1></div>

        

        <div className = 'weather-container'>
        
        <h2>{this.state.city_name}</h2>
        <p className = 'temp'>{this.state.temperature ? this.state.temperature + " °C" : ""} {this.state.temperature ? <img src = {tempIcon} alt = 'temperature'/> : null}</p>
        <p>{this.state.description}</p>
        <img src = {`https://openweathermap.org/img/wn/${this.state.image}@2x.png`} alt=""/>
        <form>     
          <input type="text" value = {this.state.city} onChange = {this.handleChange} placeholder = 'Enter city name'/>
          <button onClick = {this.handleClick}>check</button>
        </form>
        </div>

      </div>
    );
  }

}

export default App;
