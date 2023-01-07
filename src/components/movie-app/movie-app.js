import React from 'react'
import { Tabs, Input, Pagination } from 'antd'
import { debounce } from 'lodash'

import MovieCardList from '../movie-card-list'
import MovieService from '../../services/api/movie-service'
import { GenresProvider } from '../genres-context/genres-context'

import './movie-app.css'

const MOVIES_PER_PAGE_RESPONCE = 20
const TAB_SEARCH = 'search'
const TAB_RATE = 'rate'

export default class MovieApp extends React.Component {
  state = {
    movies: null,
    resultsCount: null,
    resultPage: 1,
    moviesListLoading: false,
    error: null,
    searchWords: '',
    pageSize: MOVIES_PER_PAGE_RESPONCE,
    activeTab: TAB_SEARCH,
  }

  movieService = new MovieService()

  genres = new Map()

  constructor(props) {
    super(props)

    this.inputRef = React.createRef()
  }

  componentDidMount() {
    const guestSession = window.localStorage.getItem('guest_session_id')
    if (!guestSession) {
      this.movieService.createGuestSesstion()
    }
    this.movieService.getGenres().then((genres) => (this.genres = genres))
    this.inputRef.current.focus()
  }

  updatePage = (keyWords, page = 1) => {
    if (!keyWords.trim()) {
      this.setState({
        movies: [],
        resultsCount: 0,
        resultPage: 1,
        moviesListLoading: false,
        error: null,
      })
      return
    }

    this.setState({ moviesListLoading: true, error: null })
    this.movieService.getMovies(keyWords, page).then(this.onMoviesListLoaded).catch(this.onMoviesListLoadError)
  }

  debounceUpdatePage = debounce((searchWords) => this.updatePage(searchWords), 500)

  onMoviesListLoadError = (error) => {
    this.setState({
      error: error,
      moviesListLoading: false,
    })
  }

  onMoviesListLoaded = (result) => {
    this.setState((state) => {
      return {
        movies: this.sliceMoviesByPageSize(result.results, state.resultPage),
        resultsCount: result.total_results,
        moviesListLoading: false,
      }
    })
  }

  onSearchInput = (e) => {
    this.setState(() => ({
      searchWords: e.target.value,
    }))
    if (this.state.activeTab === TAB_SEARCH) {
      this.debounceUpdatePage(e.target.value)
    }
  }

  onTabSwitched = (activeKey) => {
    switch (activeKey) {
      case TAB_SEARCH:
        this.setState({ activeTab: TAB_SEARCH, resultPage: 1 })
        this.updatePage(this.state.searchWords)
        break
      case TAB_RATE:
        this.setState({ moviesListLoading: true, activeTab: TAB_RATE, resultPage: 1, error: null })
        this.movieService.getRatedMovies().then(this.onMoviesListLoaded).catch(this.onMoviesListLoadError)
        break
      default:
        break
    }
  }

  onPaginationChange = (page, pageSize) => {
    const newPage = pageSize === this.state.pageSize ? page : 1
    this.setState(() => ({
      pageSize: pageSize,
      resultPage: newPage,
    }))
    if (this.state.activeTab === TAB_SEARCH) {
      this.updatePage(this.state.searchWords, this.sizedPageToServerPage(newPage, pageSize))
    } else if (this.state.activeTab === TAB_RATE) {
      this.setState({ moviesListLoading: true, error: null })
      this.movieService
        .getRatedMovies(this.sizedPageToServerPage(newPage, pageSize))
        .then(this.onMoviesListLoaded)
        .catch(this.onMoviesListLoadError)
    }
  }

  sizedPageToServerPage = (currentPage, pageSize) => {
    return Math.ceil((pageSize * currentPage - 1) / MOVIES_PER_PAGE_RESPONCE)
  }

  sliceMoviesByPageSize = (movies, newPageNumber) => {
    const startIndex = Math.round(this.state.pageSize * (newPageNumber - 1)) % MOVIES_PER_PAGE_RESPONCE
    const finishIndex = startIndex + this.state.pageSize
    return movies.slice(startIndex, finishIndex)
  }

  onMovieRate = (movieId, rating) => {
    this.setState((state) => {
      let moviesCopy = JSON.parse(JSON.stringify(state.movies))
      let ratedMovie = moviesCopy.find((movie) => movie.id === movieId)
      ratedMovie.rating = rating

      if (rating === 0) {
        window.localStorage.removeItem(`rate_${movieId}`)
      } else {
        window.localStorage.setItem(`rate_${movieId}`, rating)
      }

      return { movies: moviesCopy }
    })
  }

  render() {
    return (
      <div className="app body__app">
        <div className="app__tabs-switch">
          <Tabs
            defaultActiveKey={TAB_SEARCH}
            centered="true"
            items={[
              {
                label: 'Search',
                key: TAB_SEARCH,
              },
              {
                label: 'Rated',
                key: TAB_RATE,
              },
            ]}
            activeKey={this.state.activeTab}
            onChange={this.onTabSwitched}
          />
        </div>
        <Input
          ref={this.inputRef}
          placeholder="Type to search..."
          onInput={this.onSearchInput}
          value={this.state.searchWords}
        />
        <GenresProvider value={this.genres}>
          <MovieCardList
            movies={this.state.movies}
            loading={this.state.moviesListLoading}
            error={this.state.error}
            onMovieRate={this.onMovieRate}
          />
        </GenresProvider>
        <Pagination
          defaultCurrent={1}
          total={this.state.resultsCount}
          className="app__pagination"
          pageSizeOptions={[5, 10, 20]}
          defaultPageSize={MOVIES_PER_PAGE_RESPONCE}
          showQuickJumper={true}
          onChange={this.onPaginationChange}
          current={this.state.resultPage}
        />
      </div>
    )
  }
}
