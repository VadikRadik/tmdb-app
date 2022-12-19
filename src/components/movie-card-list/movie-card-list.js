import React from 'react'
import { Row } from 'antd'

import MovieCard from '../movie-card'

import './movie-card-list.css'

const MovieCardList = ({ movies }) => {
  const isMobile = window.matchMedia('only screen and (max-width: 768px)').matches
  const gridGutters = isMobile ? [16, 20] : [36, 36]
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
      <Row gutter={gridGutters}>{cards}</Row>
    </div>
  )
}

export default MovieCardList
