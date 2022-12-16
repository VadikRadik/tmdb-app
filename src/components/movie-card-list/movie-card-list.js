import React from 'react'
import { Row } from 'antd'

import MovieCard from '../movie-card'

import './movie-card-list.css'

const MovieCardList = ({ movies }) => {
  //const cards = new Array(6).fill(MovieCard())
  const cards = movies.map((movie) => {
    return (
      <MovieCard
        key={movie.id}
        poster={movie.poster_path}
        title={movie.title}
        rate={movie.vote_average}
        date={movie.release_date}
        overview={movie.overview}
      />
    )
  })
  return (
    <div className="movie-card-list app__card-list">
      <Row gutter={[36, 36]}>{cards}</Row>
    </div>
  )
}

export default MovieCardList
