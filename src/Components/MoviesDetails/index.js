import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import Loading from '../Loading'
import Failure from '../Failure'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetailsView extends Component {
  state = {
    activeStatus: apiStatusConstants.initial,
    movieDetails: [],
    genres: [],
    spokenLanguages: [],
    similarMovies: [],
  }

  componentDidMount() {
    this.getMoviePosterDetails()
  }

  getMoviePosterDetails = async () => {
    this.setState({activeStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.movie_details.id,
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        title: data.movie_details.title,
        overview: data.movie_details.overview,
        originalLanguage: data.movie_details.original_language,
        releaseDate: data.movie_details.release_date,
        count: data.movie_details.vote_count,
        rating: data.movie_details.vote_average,
        runtime: data.movie_details.runtime,
        posterPath: data.movie_details.poster_path,
      }
      //   console.log(updatedData)
      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      // console.log(genresData)
      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      // console.log(updatedSimilarData)
      const updatedLanguagesData = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )
      this.setState({
        movieDetails: updatedData,
        genres: genresData,
        spokenLanguages: updatedLanguagesData,
        similarMovies: updatedSimilarData.slice(0, 6),
        activeStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({activeStatus: apiStatusConstants.failure})
    }
  }

  onTryAgain = () => {
    this.getMoviePosterDetails()
  }

  onMoviePosterDetailsLoading = () => <Loading />

  onMoviePosterDetailsFailure = () => <Failure onTryAgain={this.onTryAgain} />

  onMoviePosterDetailsSuccess = () => {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state
    const {
      title,
      backdropPath,
      overview,
      releaseDate,
      runtime,
      adult,
    } = movieDetails
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const d = new Date(releaseDate)
    const monthName = months[d.getMonth()]
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    const day = date.getDay().toString()
    let dateEndingWord
    if (day.endsWith('1')) {
      dateEndingWord = 'st'
    } else if (day.endsWith('2')) {
      dateEndingWord = 'nd'
    } else if (day.endsWith('3')) {
      dateEndingWord = 'rd'
    } else {
      dateEndingWord = 'th'
    }
    return (
      <>
        <div
          data-testid="videoItemDetails"
          className="poster-info-con"
          alt={title}
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%),url(${backdropPath})`,
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
            <h1 className="poster-heading" key={title}>
              {title}
            </h1>
            <div className="inner-info">
              <p className="time">{`${hours}h ${minutes}m `}</p>
              <p className="time in-time">{adult ? 'A' : 'U/A'}</p>
              <p className="time" key={releaseDate}>
                {year}
              </p>
            </div>
            <p className="poster-para" key={overview}>
              {overview}
            </p>
            <button className="poster-btn" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-info-container">
          <div>
            <h4 className="movie-info-heading">Genres</h4>
            <ul className="movie-ul">
              {genres.map(genre => (
                <li className="movie-info-para" key={genre.id}>
                  <p>{genre.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="movie-info-heading">Audio Available</h4>
            <ul className="movie-ul">
              {spokenLanguages.map(spoken => (
                <li className="movie-info-para" key={spoken.id}>
                  <p>{spoken.language}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="movie-info-heading">Rating Count</h4>
            <p className="movie-info-para">{movieDetails.count}</p>
            <h4 className="movie-info-heading">Rating Average</h4>
            <p className="movie-info-para">{movieDetails.rating}</p>
          </div>
          <div>
            <h4 className="movie-info-heading">Budget</h4>
            <p className="movie-info-para">{movieDetails.budget}</p>
            <h4 className="movie-info-heading">Release Date</h4>
            <p className="movie-info-para" key={releaseDate}>
              <span className="movie-info-date">{day}</span>
              <span className="movie-info-date-end">{dateEndingWord} </span>
              <span className="movie-info-month-name">{monthName} </span>
              <span className=" movie-info-year">{year}</span>
            </p>
          </div>
        </div>
        <div className="similar-container">
          <h1 className="similar-heading">More like this</h1>
          <ul className="similar-ul">
            {similarMovies.map(sim => (
              <Link to={`/movies/${sim.id}`} key={sim.id} target="_parent">
                <li key={sim.id}>
                  <img
                    className="similar-img"
                    src={sim.posterPath}
                    alt={sim.title}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {activeStatus} = this.state

    return (
      <>
        {activeStatus === apiStatusConstants.inProgress && (
          <>{this.onMoviePosterDetailsLoading()}</>
        )}
        {activeStatus === apiStatusConstants.failure && (
          <>{this.onMoviePosterDetailsFailure()}</>
        )}
        {activeStatus === apiStatusConstants.success && (
          <>
            {this.onMoviePosterDetailsSuccess()}
            <Footer />
          </>
        )}
      </>
    )
  }
}

export default MovieDetailsView
