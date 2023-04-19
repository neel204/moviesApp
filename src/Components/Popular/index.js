import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loading from '../Loading'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {popularMovies: [], activeStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularMovie()
  }

  getPopularMovie = async () => {
    this.setState({activeStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.results.map(eachMovie => ({
        title: eachMovie.title,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        id: eachMovie.id,
        posterUrl: eachMovie.poster_path,
      }))

      this.setState({
        popularMovies: formattedData,
        activeStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({activeStatus: apiStatusConstants.failure})
    }
  }

  onTryAgain = () => {
    this.getPopularMovie()
  }

  onPopularLoading = () => <Loading />

  onPopularSuccess = () => {
    const {popularMovies} = this.state

    return (
      <div className="popular-movie-info">
        <ul className="popular-list">
          {popularMovies.map(eachPop => (
            <div className="info-con">
              <Link to={`/movies/${eachPop.id}`}>
                <img
                  src={eachPop.posterUrl}
                  alt="poster"
                  className="poster-img"
                />
              </Link>
              <p className="poster-name">{eachPop.title}</p>
            </div>
          ))}
        </ul>
      </div>
    )
  }

  onPopularFailure = () => (
    <div className="popular-loading-failure-con">
      <div className="popular-failure-mgs-con">
        <img
          className="popular-fail"
          src="https://res.cloudinary.com/dqhwxowdo/image/upload/v1680533820/MOVIES%20APP%20NETFLIX-AMAZON%20PRIME%20CLONE/Group_4_ftajnm.png"
          alt="failure view"
        />
        <p className="went-wrong-mgs">Something went wrong. Please try again</p>
        <button
          className="try-again-btn"
          type="button"
          onClick={this.onTryAgain}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderPopular = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatusConstants.success:
        return this.onPopularSuccess()
      case apiStatusConstants.failure:
        return this.onPopularFailure()
      case apiStatusConstants.inProgress:
        return this.onPopularLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPopular()}
        <Footer />
      </>
    )
  }
}

export default Popular
