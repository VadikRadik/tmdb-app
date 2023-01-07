const BASE_URL = 'https://api.themoviedb.org/3'

class MovieService {
  createGuestSesstion() {
    fetch(
      // eslint-disable-next-line no-undef
      `${BASE_URL}/authentication/guest_session/new?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
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
    let resultGenresMap = new Map()

    const res = await fetch(
      // eslint-disable-next-line no-undef
      `${BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    if (!res.ok) {
      throw new Error(`Unable to fetch genres, responce status: ${res.status}`)
    }
    await res
      .json()
      .then((result) => {
        result.genres.forEach((genre) => resultGenresMap.set(genre.id, genre.name))
      })
      .catch((error) => {
        throw new Error(`Unable to fetch genres, error: ${error}`)
      })

    return resultGenresMap
  }

  async getMovies(keyWords, page) {
    const res = await fetch(
      // eslint-disable-next-line no-undef
      `${BASE_URL}/search/movie?query=${keyWords}&api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    )
    if (!res.ok) {
      throw new Error(`Unable to fetch movies, responce status: ${res.status}`)
    }

    return res.json()
  }

  async getRatedMovies(page = 1) {
    const res = await fetch(
      `${BASE_URL}/guest_session/${window.localStorage.getItem(
        'guest_session_id'
        // eslint-disable-next-line no-undef
      )}/rated/movies?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    )
    if (!res.ok) {
      throw new Error(`Unable to fetch movies, responce status: ${res.status}`)
    }

    return res.json()
  }

  async getPoster(posterUrl) {
    const res = await fetch(`https://image.tmdb.org/t/p/original/${posterUrl}`)
    if (!res.ok) {
      throw new Error(`Unable to fetch poster, responce status: ${res.status}`)
    }

    return res.blob()
  }

  async deleteRating(movieId) {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/rating?api_key=${
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
    if (!res.ok) {
      throw new Error(`Unable to delete rating, responce status: ${res.status}`)
    }
    return res
  }

  async changeRating(movieId, newRating) {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/rating?api_key=${
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
    if (!res.ok) {
      throw new Error(`Unable to change rating, responce status: ${res.status}`)
    }
    return res
  }
}

export default MovieService
