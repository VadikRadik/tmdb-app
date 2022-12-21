import React from 'react'
import { Col, Tag, Rate, Spin, Alert } from 'antd'
import { format } from 'date-fns'

import './movie-card.css'

const OVERVIEW_MAX_LENGTH = 150

export default class MovieCard extends React.Component {
  state = {
    loadingPoster: false,
    error: null,
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

  render() {
    const { title, rate, date, overview } = this.props

    const isMobile = window.matchMedia('only screen and (max-width: 768px)').matches
    const colWidth = isMobile ? 24 : 12

    let poster = this.state.loadingPoster ? (
      <Spin className="movie-card__spin" />
    ) : (
      <img className="movie-card__poster" src={`${this.posterImage}`} alt="Movie poster image" />
    )

    if (this.state.error !== null) {
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
              <Rate disabled count={10} defaultValue={rate} allowHalf={true} className="movie-card__rate" />
            </div>
          </div>
          <div className="movie-card-list__card--mobile">
            <div className="movie-card__info--mobile">{this.cutOverview(overview)}</div>
            <Rate disabled count={10} defaultValue={rate} allowHalf={true} className="movie-card__rate--mobile" />
          </div>
        </div>
      </Col>
    )
  }
}
