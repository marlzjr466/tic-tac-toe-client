import { ReduxMeta } from '@opensource-dev/redux-meta'

// images
import MainBG from '@assets/images/main-bg.jpg'

// components
import Frame from '@components/frame'

const rdxm = new ReduxMeta()
function App () {
  const { metaStates } = rdxm.useMeta()
  
  const meta = {
    ...metaStates('app', ['mode'])
  }

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