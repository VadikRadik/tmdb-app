import React from 'react'
import { Row, Spin, Alert } from 'antd'

import MovieCard from '../movie-card'

import './movie-card-list.css'

export default class MovieCardList extends React.Component {
  static defaultProps = {
    movies: [],
  }

  render() {
    if (this.props.loading) {
      return <Spin tip="Loading" size="large" className="movie-card-list__spin"></Spin>
    }
    if (this.props.error !== null) {
      return (
        <Alert
          message="Error"
          description={`Unable to load movies: ${this.props.error.message}`}
          type="error"
          showIcon
          className="movie-card-list__alert"
        />
      )
    }
    if (this.props.movies === null) {
      return null
    }
    if (this.props.movies.length === 0) {
      return (
        <Alert message="No movies found for your request" type="info" showIcon className="movie-card-list__alert" />
      )
    }

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
