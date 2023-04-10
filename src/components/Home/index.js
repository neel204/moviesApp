import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import TrendingNow from '../TrendingNow'
import Original from '../Original'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    bgPosterAndDetails: {},
    activeStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPosterDetails()
  }

  getPosterDetails = async () => {
    this.setState({activeStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/originals`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const dataLength = data.results.length
      const randomPoster = data.results[Math.floor(Math.random() * dataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }
      //   console.log(updatedData)
      this.setState({
        bgPosterAndDetails: updatedData,
        activeStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        activeStatus: apiStatusConstants.failure,
      })
    }
  }

  onTryAgain = () => {
    this.getPosterDetails()
  }

  onLoading = () => (
    <>
      <Header className="header-loading-failure" />
      <div className="loading-failure-con">
        <div className="failure-mgs-con" testid="loader">
          <Loader
            type="TailSpin"
            height="80"
            width="80"
            color="#D81F26"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    </>
  )

  onFailure = () => (
    <>
      <Header className="header-loading-failure" />
      <div className="header-loading-failure-con">
        <div className="failure-mgs-con">
          <img
            className="img-wrong"
            src="https://res.cloudinary.com/dqhwxowdo/image/upload/v1680020298/MOVIES%20APP%20NETFLIX-AMAZON%20PRIME%20CLONE/Icon_vbyyrg.png"
            alt="failure view"
          />
          <p className="went-wrong-mgs">
            Something went wrong. Please try again
          </p>
          <button
            className="try-again-btn"
            type="button"
            onClick={this.onTryAgain}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  onSuccess = () => {
    const {bgPosterAndDetails} = this.state
    return (
      <>
        <div
          className="poster-info-con"
          alt={bgPosterAndDetails.title}
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%),url(${bgPosterAndDetails.backdropPath})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            minHeight: '605px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header className="movie-header" />
          <div className="header-poster-details">
            <h1 className="poster-heading" key={bgPosterAndDetails.title}>
              {bgPosterAndDetails.title}
            </h1>
            <h1 className="poster-para" key={bgPosterAndDetails.overview}>
              {bgPosterAndDetails.overview}
            </h1>
            <button className="poster-btn" type="button">
              Play
            </button>
          </div>
        </div>
      </>
    )
  }

  renderPosterDetails = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatusConstants.success:
        return this.onSuccess()
      case apiStatusConstants.failure:
        return this.onFailure()
      case apiStatusConstants.inProgress:
        return this.onLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home">
        {this.renderPosterDetails()}
        <h1 className="content">Trending Now</h1>
        <TrendingNow />
        <h1 className="content">Original</h1>
        <Original />
        <Footer />
      </div>
    )
  }
}

export default Home
