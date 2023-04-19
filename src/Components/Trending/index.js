import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactSlick from '../ReactSlick'
import Loading from '../Loading'
import Failure from '../Failure'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {trendingNow: [], activeStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingNow()
  }

  getTrendingNow = async () => {
    this.setState({activeStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        name: eachMovie.title,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        id: eachMovie.id,
        posterUrl: eachMovie.poster_path,
      }))
      this.setState({
        trendingNow: formattedData,
        activeStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({activeStatus: apiStatusConstants.failure})
    }
  }

  onTryAgain = () => {
    this.getTrendingNow()
  }

  onTrendLoading = () => <Loading />

  onTrendFailure = () => <Failure onTryAgain={this.onTryAgain} />

  onTrendSuccess = () => {
    const {trendingNow} = this.state
    return (
      <>
        <ReactSlick moviesList={trendingNow} />
      </>
    )
  }

  onRenderTrending = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatusConstants.success:
        return this.onTrendSuccess()
      case apiStatusConstants.failure:
        return this.onTrendFailure()
      case apiStatusConstants.inProgress:
        return this.onTrendLoading()
      default:
        return null
    }
  }

  render() {
    return <div>{this.onRenderTrending()}</div>
  }
}

export default Trending
