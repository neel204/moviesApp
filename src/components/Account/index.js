import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  //  getting username and password from localStorage
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <Header />
      <div className="account-info-con">
        <div className="info-con-acc">
          <h1 className="acc-heading">Account</h1>
          <hr />
          <div className="acc-ship">
            <p className="acc-user">Member ship</p>
            <div className="member-info">
              <p className="acc-name">{username}@gmail.com</p>
              <p className="acc-user">
                Password : {'*'.repeat(password.length)}
              </p>
            </div>
          </div>
          <hr />
          <div className="acc-ship">
            <p className="acc-user">Plan details</p>
            <p className="acc-name">Premium</p>
            <p className="acc-hd">Ultra HD</p>
          </div>
          <hr />
          <div className="btn-con">
            <button className="logout-btn" type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer className="footer" />
    </>
  )
}

export default Account
