import React from 'react'
import { Col, Tag, Rate, Spin, Alert } from 'antd'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { GenresConsumer } from '../genres-context/genres-context'
import MovieService from '../../services/api/movie-service'

import './movie-card.css'

const OVERVIEW_MAX_LENGTH = 150

const movieService = new MovieService()

export default class MovieCard extends React.Component {
  static defaultProps = {
    onMovieRate: () => {},
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rate: PropTypes.number,
    date: PropTypes.string,
    overview: PropTypes.string.isRequired,
    myRate: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.number).isRequired,
    onMovieRate: PropTypes.func,
  }

  state = {
    loadingPoster: false,
    imageError: null,
    ratingError: null,
  }

  posterImage = null

  cutOverview = (overview) => {
    if (overview.lenght < OVERVIEW_MAX_LENGTH) {
      return overview
    }
    const whiteSpace = overview.indexOf(' ', OVERVIEW_MAX_LENGTH)
    return overview.slice(0, whiteSpace) + ' ...'
  }

  componentDidMount() {
    this.setState({ loadingPoster: true })

    movieService
      .getPoster(this.props.poster)
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob)
        this.posterImage = imageObjectURL
        this.setState({ loadingPoster: false })
      })
      .catch((error) => {
        this.setState({
          loadingPoster: false,
          imageError: error,
        })
      })
  }

  deleteRating = (movieId) => {
    movieService
      .deleteRating(movieId)
      .then((response) => {
        if (response.ok) {
          this.props.onMovieRate(movieId, 0)
        } else {
          this.onRatingError(new Error(`Unable to post rate, responce status: ${response.status}`))
        }
      })
      .catch((error) => {
        this.onRatingError(error)
        throw new Error(`Unable to post rate, error: ${error}`)
      })
  }

  onRatingChange = (movieId, newRating) => {
    if (newRating === 0) {
      this.deleteRating(movieId)
      return
    }

    movieService
      .changeRating(movieId, newRating)
      .then((response) => {
        if (response.ok) {
          this.props.onMovieRate(movieId, newRating)
        } else {
          this.onRatingError(new Error(`Unable to post rate, responce status: ${response.status}`))
        }
      })
      .catch((error) => {
        this.onRatingError(error)
        throw new Error(`Unable to post rate, error: ${error}`)
      })
  }

  onRatingError = (error) => {
    this.setState(() => ({
      ratingError: new Error(`Unable to update rating: ${error.message}`),
    }))
    setTimeout(() => {
      this.setState(() => ({
        ratingError: null,
      }))
    }, 2500)
  }

  render() {
    const { id, title, rate, date, overview, myRate, genres } = this.props

    const isMobile = window.matchMedia('only screen and (max-width: 768px)').matches
    const colWidth = isMobile ? 24 : 12

    let poster = this.state.loadingPoster ? (
      <Spin className="movie-card__spin" />
    ) : (
      <img className="movie-card__poster" src={`${this.posterImage}`} alt="Movie poster image" />
    )

    if (this.state.imageError !== null) {
      poster = <Alert message="Unable to load image" type="error" showIcon className="movie-card__error" />
    }

    const genresTags = (
      <GenresConsumer>
        {(genresMap) => {
          const tags = genres.map((genreId) => {
            return <Tag key={genreId}>{genresMap.get(genreId)}</Tag>
          })
          return <div className="movie-card__tags">{tags}</div>
        }}
      </GenresConsumer>
    )

    let circleRatingClass = classNames(
      'movie-card__circle-rate',
      { 'movie-card__circle-rate--red': rate < 3 },
      { 'movie-card__circle-rate--orange': rate >= 3 && rate < 5 },
      { 'movie-card__circle-rate--yellow': rate >= 5 && rate <= 7 },
      { 'movie-card__circle-rate--green': rate > 7 }
    )

    return (
      <Col span={colWidth}>
        <div className="movie-card">
          <div className="movie-card-list__card">
            {poster}
            <div className="movie-card__info-layout">
              <div className="movie-card__title">
                <span>{title}</span>
                <div className={circleRatingClass}>{Number(rate).toFixed(1)}</div>
              </div>
              <div className="movie-card__date">{date ? format(new Date(date), 'MMMM d, Y') : null}</div>
              {genresTags}
              <div className="movie-card__info">{this.cutOverview(overview)}</div>
              {this.state.ratingError ? (
                <Alert message={this.state.ratingError.message} type="error" showIcon className="movie-card__rate" />
              ) : (
                <Rate
                  count={10}
                  value={myRate}
                  allowHalf={true}
                  className="movie-card__rate"
                  onChange={(value) => {
                    return this.onRatingChange(id, value)
                  }}
                />
              )}
            </div>
          </div>
          <div className="movie-card-list__card--mobile">
            <div className="movie-card__info--mobile">{this.cutOverview(overview)}</div>
            {this.state.ratingError ? (
              <Alert
                message={this.state.ratingError.message}
                type="error"
                showIcon
                className="movie-card__rate--mobile"
              />
            ) : (
              <Rate
                count={10}
                value={myRate}
                allowHalf={true}
                className="movie-card__rate--mobile"
                onChange={(value) => {
                  return this.onRatingChange(id, value)
                }}
              />
            )}
          </div>
        </div>
      </Col>
    )
  }
}
