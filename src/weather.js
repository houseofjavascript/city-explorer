import React from "react";




class Weather extends React.Component {
  render(){
    return(
      <>
        <title>Daily Weather</title>

        {this.props.weatherData.map((day, indx) => {
          return(
            <>
            {day.date}
            {day.description}
            </>
          )
        })}
      </>
    )
  }
}


export default Weather;
