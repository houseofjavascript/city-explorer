import React from "react";
import Card from 'react-bootstrap/Card'




class Movies extends React.Component {
  render(){
    return(
      <>
        <title>Top Movies in My Area</title>

        {this.props.movieData.map((movie, indx) => {
          return(
            <>
            {movie.title}
            {movie.overview}
            <Card.Img src={movie.poster_path}/>
            </>
          )
        })}
      </>
    )
  }
}


export default Movies;
