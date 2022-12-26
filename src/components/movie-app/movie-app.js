import React from 'react'
import { Tabs, Input, Pagination } from 'antd'
import { debounce } from 'lodash'

import MovieCardList from '../movie-card-list'
import { GenresProvider } from '../genres-context/genres-context'

import './movie-app.css'

const MOVIES_PER_PAGE_RESPONCE = 20
const TAB_SEARCH = '1'
const TAB_RATE = '2'

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

  genres = new Map()

  constructor(props) {
    super(props)

    this.inputRef = React.createRef()
  }

  componentDidMount() {
    const guestSession = window.localStorage.getItem('guest_session_id')
    if (!guestSession) {
      this.createGuestSesstion()
    }
    this.getGenres()
    this.inputRef.current.focus()
  }

  createGuestSesstion() {
    fetch(
      // eslint-disable-next-line no-undef
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
      .then((response) => {
        return response.ok
          ? response.json()
          : new Error(`Unable to fetch guest session, responce status: ${response.status}`)
      })
      .then((result) => {
        window.localStorage.setItem('guest_session_id', result.guest_session_id)
      })
      .catch((error) => {
        throw new Error(`Unable to fetch guest session, error: ${error}`)
      })
  }

  async getGenres() {
    const res = await fetch(
      // eslint-disable-next-line no-undef
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    if (!res.ok) {
      throw new Error(`Unable to fetch genres, responce status: ${res.status}`)
    } else {
      res
        .json()
        .then((result) => {
          result.genres.map((genre) => this.genres.set(genre.id, genre.name))
        })
        .catch((error) => {
          throw new Error(`Unable to fetch genres, error: ${error}`)
        })
    }
  }

  async getMovies(keyWords, page) {
    this.setState({
      movingListLoading: true,
      error: null,
    })
    const res = await fetch(
      // eslint-disable-next-line no-undef
      `https://api.themoviedb.org/3/search/movie?query=${keyWords}&api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    )
    if (!res.ok) {
      throw new Error(`Unable to fetch movies, responce status: ${res.status}`)
    }

    return res.json()
  }

  async getRatedMovies(page = 1) {
    this.setState({
      movingListLoading: true,
      error: null,
    })
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${window.localStorage.getItem(
        'guest_session_id'
        // eslint-disable-next-line no-undef
      )}/rated/movies?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    )
    if (!res.ok) {
      throw new Error(`Unable to fetch movies, responce status: ${res.status}`)
    }

    return res.json()
  }

  updatePage = (keyWords, page = 1) => {
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
    this.getMovies(keyWords, page).then(this.onMoviesListLoaded).catch(this.onMoviesListLoadError)
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
      case '1':
        this.setState({ activeTab: TAB_SEARCH, resultPage: 1 })
        this.updatePage(this.state.searchWords)
        break
      case '2':
        this.setState({ moviesListLoading: true, activeTab: TAB_RATE, resultPage: 1 })
        this.getRatedMovies().then(this.onMoviesListLoaded).catch(this.onMoviesListLoadError)
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
      this.getRatedMovies(this.sizedPageToServerPage(newPage, pageSize))
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
            defaultActiveKey="1"
            centered="true"
            items={[
              {
                label: 'Search',
                key: '1',
              },
              {
                label: 'Rated',
                key: '2',
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
