import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-icon-con">
      <button type="button" className="footer-btn">
        <FaGoogle className="social-icon" />
      </button>
      <button type="button" className="footer-btn">
        <FaTwitter className="social-icon" />
      </button>
      <button type="button" className="footer-btn">
        <FaInstagram className="social-icon" />
      </button>
      <button type="button" className="footer-btn">
        <FaYoutube className="social-icon" />
      </button>
    </div>
    <p className="footer-heading">Contact Us</p>
  </div>
)

export default Footer
