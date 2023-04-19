import './index.css'

const Failure = props => {
  const {onTryAgain} = props

  const tryAgain = () => {
    onTryAgain()
  }

  return (
    <div className="trend-loading-failure-con">
      <div className="trend-failure-mgs-con">
        <img
          className="img-wrong"
          src="https://res.cloudinary.com/dqhwxowdo/image/upload/v1680020298/MOVIES%20APP%20NETFLIX-AMAZON%20PRIME%20CLONE/Icon_vbyyrg.png"
          alt="failure view"
        />
        <p className="went-wrong-mgs">Something went wrong. Please try again</p>
        <button className="try-again-btn" type="button" onClick={tryAgain}>
          Try Again
        </button>
      </div>
    </div>
  )
}

export default Failure
