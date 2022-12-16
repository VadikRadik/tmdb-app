import React from 'react'
import { Col, Tag, Rate } from 'antd'
import { format } from 'date-fns'

import './movie-card.css'

const OVERVIEW_MAX_LENGTH = 150

const cutOverview = (overview) => {
  if (overview.lenght < OVERVIEW_MAX_LENGTH) {
    return overview
  }
  const whiteSpace = overview.indexOf(' ', OVERVIEW_MAX_LENGTH)
  return overview.slice(0, whiteSpace) + ' ...'
}

const MovieCard = ({ poster, title, rate, date, overview }) => {
  return (
    <Col span={12}>
      <div className="movie-card movie-card-list__card">
        <img className="movie-card__poster" src={`https://image.tmdb.org/t/p/original/${poster}`} />
        <div className="movie-card__info-layout">
          <div className="movie-card__title">
            <span>{title}</span>
            <div className="movie-card__circle-rate">{Number(rate).toFixed(1)}</div>
          </div>
          <div className="movie-card__date">{format(new Date(date), 'MMMM d, Y')}</div>
          <div className="movie-card__tags">
            <Tag>Action</Tag>
            <Tag>Action</Tag>
            <Tag>Action</Tag>
            <Tag>Action</Tag>
          </div>
          <div className="movie-card__info">{cutOverview(overview)}</div>
          <Rate disabled count={10} defaultValue={rate} allowHalf={true} className="movie-card__rate" />
        </div>
      </div>
    </Col>
  )
}

export default MovieCard
