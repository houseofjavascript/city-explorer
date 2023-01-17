
import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: ''
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
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&q=${this.state.city}&format=json`

      console.log(url);
      let cityDataFromAxios = await axios.get(url)
      // console.log(cityDataFromAxios.data)
      // TODO: save that data to state
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      })


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

  render(){
    return(
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
          this.state.error
          ? <p>{this.state.errorMessage}</p>
          : <p>{this.state.cityData.display_name},{this.state.cityData.lat},{this.state.cityData.lon}</p>
        

        }
      </>
    )
  }
}

export default App;
