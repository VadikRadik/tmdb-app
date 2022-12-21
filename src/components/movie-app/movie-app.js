import React from 'react'
import { Tabs, Input, Pagination } from 'antd'
import { debounce } from 'lodash'

import MovieCardList from '../movie-card-list'

import './movie-app.css'

export default class MovieApp extends React.Component {
  state = {
    movies: null,
    resultsCount: null,
    resultPage: null,
    moviesListLoading: false,
    error: null,
    searchWords: '',
  }

  async getMovies(keyWords) {
    this.setState({
      movingListLoading: true,
      error: null,
    })
    const res = await fetch(
      // eslint-disable-next-line no-undef
      `https://api.themoviedb.org/3/search/movie?query=${keyWords}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    if (!res.ok) {
      throw new Error(`Unable to fetch movies, responce status: ${res.status}`)
    }

    return res.json()
  }

  updatePage = (keyWords) => {
    if (!keyWords.trim()) {
      this.setState({
        movies: [],
        resultsCount: 0,
        resultPage: 1,
        movingListLoading: false,
        error: null,
      })
      return
    }

    this.setState({ moviesListLoading: true })
    this.getMovies(keyWords).then(this.onMoviesListLoaded).catch(this.onMoviesListLoadError)
  }

  debounceUpdatePage = debounce((searchWords) => this.updatePage(searchWords), 500)

  onMoviesListLoadError = (error) => {
    this.setState({
      error: error,
      moviesListLoading: false,
    })
  }

  onMoviesListLoaded = (result) => {
    this.setState(() => {
      return {
        movies: result.results,
        resultsCount: result.total_results,
        resultPage: result.page,
        moviesListLoading: false,
      }
    })
  }

  onSearchInput = (e) => {
    this.setState(() => ({
      searchWords: e.target.value,
    }))
    this.debounceUpdatePage(e.target.value)
  }

  render() {
    return (
      <div className="app body__app">
        <div className="app__tabs-switch">
          <Tabs
            defaultActiveKey="1"
            centered="true"
            items={[
              {
                label: 'Search',
                key: '1',
                children: null,
              },
              {
                label: 'Rated',
                key: '2',
                children: null,
              },
            ]}
          />
        </div>
        <Input placeholder="Type to search..." onInput={this.onSearchInput} value={this.state.searchWords} />
        <MovieCardList movies={this.state.movies} loading={this.state.moviesListLoading} error={this.state.error} />
        <Pagination defaultCurrent={1} total={this.state.resultsCount} className="app__pagination" />
      </div>
    )
  }
}
