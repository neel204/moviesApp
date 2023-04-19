import Loader from 'react-loader-spinner'

const Loading = () => (
  <div className="loading-container">
    <div className="loading-msg" testid="loader">
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
)

export default Loading
