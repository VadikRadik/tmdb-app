import React from 'react'
import { Tabs, Input, Pagination } from 'antd'
import { debounce } from 'lodash'

import MovieCardList from '../movie-card-list'

import './movie-app.css'

const MOVIES_PER_PAGE_RESPONCE = 20

export default class MovieApp extends React.Component {
  state = {
    movies: null,
    resultsCount: null,
    resultPage: 1,
    moviesListLoading: false,
    error: null,
    searchWords: '',
    pageSize: MOVIES_PER_PAGE_RESPONCE,
  }

  sizedCurrentPage = MOVIES_PER_PAGE_RESPONCE

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
        //resultPage: result.page,
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

  onPaginationChange = (page, pageSize) => {
    //console.log(`page:${page}, pageSize:${pageSize}`)
    const newPage = pageSize === this.state.pageSize ? page : 1
    this.setState(() => ({
      pageSize: pageSize,
      resultPage: newPage,
    }))
    this.updatePage(this.state.searchWords, this.sizedPageToServerPage(newPage, pageSize))
  }

  sizedPageToServerPage = (currentPage, pageSize) => {
    return Math.ceil((pageSize * currentPage - 1) / MOVIES_PER_PAGE_RESPONCE)
  }

  sliceMoviesByPageSize = (movies, newPageNumber) => {
    const startIndex = Math.round(this.state.pageSize * (newPageNumber - 1)) % MOVIES_PER_PAGE_RESPONCE
    const finishIndex = startIndex + this.state.pageSize
    return movies.slice(startIndex, finishIndex)
  }
}
