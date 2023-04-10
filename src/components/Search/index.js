import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    result: true,
    searchResult: [],
    userSearchMovie: '',
    resultMovie: [],
    activeStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieList()
  }

  onUserInput = event => {
    this.setState({userSearchMovie: event.target.value.toLowerCase()})
  }

  getMovieList = async () => {
    this.setState({activeStatus: apiStatusConstants.inProgress})
    const {userSearchMovie} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${userSearchMovie}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        title: each.title,
        id: each.id,
        backdropPath: each.backdrop_path,
      }))
      // console.log(updatedData)
      this.setState({
        searchResult: updatedData,
        activeStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        activeStatus: apiStatusConstants.failure,
      })
    }
  }

  onSearchMovie = () => {
    this.setState({result: false})
    const {searchResult, userSearchMovie} = this.state
    const result = searchResult.filter(each =>
      each.title.toLowerCase().includes(userSearchMovie.toLowerCase()),
    )
    this.setState({resultMovie: result})
    // console.log(result)
  }

  renderOnSuccessHeader = () => {
    const {userSearchMovie} = this.state

    return (
      <nav className="movie-header">
        <div className="header-con">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dqhwxowdo/image/upload/v1680010401/MOVIES%20APP%20NETFLIX-AMAZON%20PRIME%20CLONE/Group_7399_dtbqvh.png"
              alt="website logo"
              className="movies-logo"
            />
          </Link>
          <div className="header-con2">
            <ul className="header-link">
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/popular" className="link">
                Popular
              </Link>
            </ul>
            <div className="header-con">
              <div className="input-container">
                <input
                  type="search"
                  onChange={this.onUserInput}
                  placeholder="Search"
                  className="input"
                  value={`${userSearchMovie}`}
                />
                <button
                  type="button"
                  className="input-btn"
                  onClick={this.onSearchMovie}
                >
                  <HiOutlineSearch />
                </button>
              </div>
              <Link to="/account" className="link">
                <img
                  src="https://res.cloudinary.com/dqhwxowdo/image/upload/v1680533786/MOVIES%20APP%20NETFLIX-AMAZON%20PRIME%20CLONE/Avatar_2_ydqz0s.png"
                  alt="profile"
                  className="account-img"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  renderOnSuccess = () => {
    const {resultMovie} = this.state
    return (
      <div className="result-movies-container">
        {resultMovie.length > 0 ? (
          <ul className="result-movies-list">
            {resultMovie.map(movie => (
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
          this.renderOnFailure()
        )}
      </div>
    )
  }

  renderOnFailure = () => {
    const {userSearchMovie} = this.state
    return (
      <div className="result-failure">
        <img
          src="https://res.cloudinary.com/dqhwxowdo/image/upload/v1680600890/MOVIES%20APP%20NETFLIX-AMAZON%20PRIME%20CLONE/Group_7394_aadglm.png"
          alt="no result"
          className="result-failure-img"
        />
        <p className="result-failure-msg">{`Your search for ${userSearchMovie} did not find any matches.`}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderSearchMovies = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiStatusConstants.success:
        return this.renderOnSuccess()
      case apiStatusConstants.failure:
        return this.renderOnFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    const {result} = this.state
    return (
      <>
        {this.renderOnSuccessHeader()}
        {result ? (
          <div className="result-container-load">
            <p className="result-mgs">
              Click on Search Icon after typing Movie Name.
            </p>
          </div>
        ) : (
          this.renderSearchMovies()
        )}
        <Footer />
      </>
    )
  }
}

export default Search
