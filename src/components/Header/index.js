import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import './index.css'

class Header extends Component {
  state = {openClose: false}

  onOpenClose = () => {
    this.setState(prevState => ({openClose: !prevState.openClose}))
  }

  render() {
    const {openClose} = this.state
    return (
      <>
        <nav className="movie-header bg-screen">
          <div className="header-con">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dqhwxowdo/image/upload/v1680010401/MOVIES%20APP%20NETFLIX-AMAZON%20PRIME%20CLONE/Group_7399_dtbqvh.png"
                alt="website logo"
                className="movies-logo"
              />
            </Link>
            <div className="header-con2">
              <ul className="header-link" testid="header-link">
                <Link to="/" className="link ">
                  <li>Home</li>
                </Link>
                <Link to="/popular" className="link">
                  <li>Popular</li>
                </Link>
              </ul>
              <div className="header-con">
                <Link to="/search">
                  <button
                    type="button"
                    className="search-btn"
                    testid="searchButton"
                  >
                    <HiOutlineSearch className="link sea" />
                  </button>
                </Link>
                <Link to="/account" className="link">
                  <img
                    src="https://res.cloudinary.com/dqhwxowdo/image/upload/v1680533786/MOVIES%20APP%20NETFLIX-AMAZON%20PRIME%20CLONE/Avatar_2_ydqz0s.png"
                    alt="profile"
                    className="account-img"
                    data-testid="profile-image"
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <nav className="movie-header sm-screen">
          <div className="header-con">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dqhwxowdo/image/upload/v1680010401/MOVIES%20APP%20NETFLIX-AMAZON%20PRIME%20CLONE/Group_7399_dtbqvh.png"
                alt="website logo"
                className="movies-logo"
              />
            </Link>
            <div className="sm-menu-search">
              <Link to="/search">
                <button
                  type="button"
                  className="search-btn"
                >
                  <HiOutlineSearch className="link sea" />
                </button>
              </Link>
              <button
                type="button"
                className="menu-btn"
                onClick={this.onOpenClose}
              >
                <MdMenuOpen />
              </button>
            </div>
          </div>
          {openClose && (
            <div className="menu-screen " testid="header-link">
              <ul className="header-link-sm">
                <Link to="/" className="link">
                  <li>Home</li>
                </Link>
                <Link to="/popular" className="link">
                  <li>Popular</li>
                </Link>
                <Link to="/account" className="link">
                  <li>Account</li>
                </Link>
                <li>
                  <button
                    type="button"
                    className="close-menu"
                    onClick={this.onOpenClose}
                  >
                    <ImCross />
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
