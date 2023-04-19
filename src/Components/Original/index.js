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

class Original extends Component {
  state = {original: [], activeStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOriginal()
  }

  getOriginal = async () => {
    this.setState({activeStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/movies-app/originals'
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
        original: formattedData,
        activeStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({activeStatus: apiStatusConstants.failure})
    }
  }

  onTryAgain = () => {
    this.getOriginal()
  }

  onOriginalLoading = () => <Loading />

  onOriginalFailure = () => <Failure onTryAgain={this.onTryAgain} />

  onOriginalSuccess = () => {
    const {original} = this.state
    return (
      <>
        <ReactSlick moviesList={original} />
      </>
    )
  }

  onRenderOriginal = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatusConstants.success:
        return this.onOriginalSuccess()
      case apiStatusConstants.failure:
        return this.onOriginalFailure()
      case apiStatusConstants.inProgress:
        return this.onOriginalLoading()
      default:
        return null
    }
  }

  render() {
    return <div>{this.onRenderOriginal()}</div>
  }
}

export default Original
