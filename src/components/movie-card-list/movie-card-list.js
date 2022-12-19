import React from 'react'
import { Row } from 'antd'

import MovieCard from '../movie-card'

import './movie-card-list.css'

export default class MovieCardList extends React.Component {
  static defaultProps = {
    movies: [],
  }

  render() {
    if (this.props.movies === null) {
      return null
    }
    console.log(this.props.movies)
    const isMobile = window.matchMedia('only screen and (max-width: 768px)').matches
    const gridGutters = isMobile ? [16, 20] : [36, 36]
    const cards = this.props.movies.map((movie) => {
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
}
