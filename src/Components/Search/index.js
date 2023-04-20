import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loading from '../Loading'

import Header from '../Header'
import Failure from '../Failure'

import './index.css'

const searchRoute = true

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    searchResultsList: [],
    activeStatus: apiStatusConstants.initial,
    searchValue: '',
  }

  getSearchMoviesData = async searchValue => {
    this.setState({activeStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const searchApi = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(searchApi, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedSearchMoviesData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        searchResultsList: fetchedSearchMoviesData,
        activeStatus: apiStatusConstants.success,
        searchValue,
      })
    } else {
      this.setState({activeStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {searchResultsList} = this.state
    return searchResultsList.length > 0 ? (
      <ul>
        {searchResultsList.map(movie => (
          <Link to={`/movies/${movie.id}`}>
            <li key={movie.id} className="result-movies-item">
              <img
                src={movie.posterPath}
                alt="movie"
                className="result-movie-img"
              />
            </li>
          </Link>
        ))}
      </ul>
    ) : (
      this.renderNoResultsView()
    )
  }

  renderNoResultsView = () => {
    const {searchValue} = this.state

    return (
      <div className="no-results-view">
        <img
          className="no-results-img"
          alt="no movies"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
        />
        <p className="no-results-text">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderLoaderView = () => <Loading />

  onTryAgain = () => {
    this.getSearchMoviesData()
  }

  renderFailureView = () => <Failure onTryAgain={this.onTryAgain} />

  renderSwitchView = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatusConstants.loading:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-color">
        <Header
          getSearchMoviesData={this.getSearchMoviesData}
          searchRoute={searchRoute}
        />
        <div className="search-container">{this.renderSwitchView()}</div>
      </div>
    )
  }
}
export default Search
