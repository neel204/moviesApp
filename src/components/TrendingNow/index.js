import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingNow extends Component {
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

  onTrendLoading = () => (
    <>
      <div className="trend-loading-failure-con">
        <div className="trend-failure-mgs-con" testid="loader">
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

  onTrendFailure = () => (
    <>
      <div className="trend-loading-failure-con">
        <div className="trend-failure-mgs-con">
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

  onTrendSuccess = () => {
    const {trendingNow} = this.state
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="size-width">
        <Slider {...settings}>
          {trendingNow.map(eachMovie => (
            <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
              <div className="slick-item">
                <img
                  className="logo-image"
                  src={eachMovie.posterUrl}
                  alt={eachMovie.name}
                />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    )
  }

  render() {
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
}

export default TrendingNow
