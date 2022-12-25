import React from 'react'
import { Col, Tag, Rate, Spin, Alert } from 'antd'
import { format } from 'date-fns'

import './movie-card.css'

const OVERVIEW_MAX_LENGTH = 150

export default class MovieCard extends React.Component {
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
    fetch(`https://image.tmdb.org/t/p/original/${this.props.poster}`)
      .then((response) => {
        return response.ok ? response.blob() : new Error()
      })
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob)
        this.posterImage = imageObjectURL
        this.setState({ loadingPoster: false })
      })
      .catch((error) => {
        this.setState({
          loadingPoster: false,
          error: error,
        })
      })
  }

  deleteRating = (movieId) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_TMDB_API_KEY
      }&guest_session_id=${window.localStorage.getItem('guest_session_id')}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
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

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_TMDB_API_KEY
      }&guest_session_id=${window.localStorage.getItem('guest_session_id')}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: newRating }),
      }
    )
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
    const { id, title, rate, date, overview, myRate } = this.props

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

    return (
      <Col span={colWidth}>
        <div className="movie-card">
          <div className="movie-card-list__card">
            {poster}
            <div className="movie-card__info-layout">
              <div className="movie-card__title">
                <span>{title}</span>
                <div className="movie-card__circle-rate">{Number(rate).toFixed(1)}</div>
              </div>
              <div className="movie-card__date">{date ? format(new Date(date), 'MMMM d, Y') : null}</div>
              <div className="movie-card__tags">
                <Tag>Action</Tag>
                <Tag>Action</Tag>
                <Tag>Action</Tag>
                <Tag>Action</Tag>
              </div>
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
