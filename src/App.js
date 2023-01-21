
import React from 'react';

import './App.css';
import axios from 'axios';
// import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card'
import Weather from './weather';
import Movies from './movies';






class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      lat: '',
      lon: '',
      weatherData:[],
      movieData:[],


    }
  }



  // *** CITY DATA DEMO HANDLERS ***

  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  // async/await - handles our asynchronous code
  // try/catch - handle our PROMISE - resolves a successful promise or handles our errors on a rejected promise

  getCityData = async (e) => {
    e.preventDefault();

    try {
      // TODO: need use axios to hit LocationIQ - async/await
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&q=${this.state.city}&format=json&limit=1`

      let cityDataFromAxios = await axios.get(url)
      console.log(cityDataFromAxios.data[0])
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      console.log(lat,lon)
      // TODO: save that data to state
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false,
        cityMap: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=10`,

      }, () => {
        console.log(cityDataFromAxios)
      })
      console.log(cityDataFromAxios.data)
      this.handleGetWeather(lat,lon);
      this.handleGetMovie();

      //  *** FOR YOUR LAB YOU WILL NEED TO GET A MAP IMAGE SRC. Example: ***
      // ** `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&center=47.6038321,-122.3300624&zoom=10`

    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }
  //TODO : DEfine a weather handler to retrive data from backend
  //pass data into parameters
  handleGetWeather = async (lat, lon) => {
    try {
      //TODO: build url
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${lat}&lon=${lon}`
      console.log(url)
      //TODO: use axios to hit my server
      let weatherDataFromAxios = await axios.get(url);
      //TODO: Save that weather data to state
      this.setState({
        error: false,
        weatherData: weatherDataFromAxios.data,
      });
      console.log(this.state.weatherData);


    } catch (error) {
      console.log(error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }
  
  handleGetMovie = async () => {
    try{

      let url = `${process.env.REACT_APP_SERVER}/movie?searchQuery=${this.state.city}`
      let movieDatafromAxios = await axios.get(url);
      console.log('moviedata',movieDatafromAxios)

      this.setState({
        error:false,
        movieData: movieDatafromAxios.data,
      })

    } catch (error) {
      console.log(error);
      this.setState({
        error:true,
        errorMessage: error.message
      })

    }
  }

  render() {
    console.log(this.state)
    return (
      <>
        <h3>API Calls</h3>

        <form onSubmit={this.getCityData}>
          <label htmlFor=""> Please Choose a City!
            <input type="text" onInput={this.handleInput} />
            <button type='submit'>Explore</button>
          </label>

        </form>

        {/* Ternary - W ? T : F */}

        {this.state.error


          ? <Card.Text>
            {/* <h1> Error. Sorry.</h1> */}
            {this.state.errorMessage}
          </Card.Text>
          :
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{this.state.cityData.display_name}</Card.Title>
              <Card.Text>
                <Card.Img
                  className="map"
                  src={this.state.cityMap}
                />
                {this.state.cityData.lon}
                {this.state.cityData.lat}
                <h3>5 Day Forecast</h3>
                <Weather weatherData={this.state.weatherData}/>
                <h3>Trending Movies</h3>
                <Movies movieData={this.state.movieData}/>
              </Card.Text>
            </Card.Body>
          </Card>
        }


      </>
    )
  }
}



export default App;

