// images
import MainBG from '@assets/images/main-bg.jpg'

// components
import Frame from '@components/frame'

function App () {
  return (
    <>
      <div className="main-container">
        <div className="theme-default">
          <img src={MainBG} alt="Main background" className="bg" />
          <Frame />
        </div>
      </div>
    </>
  )
}

export default App