
import React from 'react';
import './App.css';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';





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
      // TODO: save that data to state
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false,
        cityMap: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=10`,

      }, () => {
        console.log(cityDataFromAxios)
      })
      console.log(cityDataFromAxios.data)

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
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}&`
      //TODO: use axios to hit my server
      let weatherDataFromAxios = await axios.get(url);
      //TODO: Save that weather data to state
      this.setState({
        error: false,
        weatherData: weatherDataFromAxios.data
      });


    } catch (error) {
      console.log(error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <>
        <h1>API Calls</h1>

        <form onSubmit={this.getCityData}>
          <label htmlFor=""> Please Choose a City!
            <input type="text" onInput={this.handleInput} />
            <button type='submit'>Explore</button>
          </label>

        </form>

        {/* Ternary - W ? T : F */}
        {
          this.state.error}
               <Carousel fade>
            ?  <Carousel.Item>
                <h1> Error. Sorry.</h1>
                <p>{this.state.errorMessage}</p>

                <Carousel.Caption>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
           : <Carousel.Item>
                <p>{this.state.cityData.display_name}</p>
                <img
                  className="map"
                  src={this.state.cityMap}
                  alt="mapimage"
                />
                <p>{this.state.cityData.lon}</p>
                <p>{this.state.cityData.lat}</p>

                <img
                  className="d-block w-100"
                  src="holder.js/800x400?text=Second slide&bg=282c34"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

        
      </>
    )
  }
}



export default App;

