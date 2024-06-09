import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// images
import BG from '@assets/images/popup.png'

function Popup ({ children, player, draw, title, onNextRound, onStopGame, delay = 1 }) {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [])

  return isShown
    ? <div className="popup">
      <div className="popup__content">
        <img src={BG} alt="Popup Bg" className="popup__content--bg" />
        <div className="popup__content--title">
          { title }
        </div>
        {
          children ? children
            : <>
              <div className="popup__content--name">
                {
                  draw ? 'DRAW'
                    : <>
                      { player.name } wins!
                      <span>player { player.type }</span>
                    </>
                }
              </div>
    
              <button onClick={onNextRound}>continue</button>
              <button onClick={onStopGame}>stop</button>
            </>
        }
      </div>
    </div> : null
}

Popup.propTypes = {
  player: PropTypes.object,
  draw: PropTypes.bool,
  onNextRound: PropTypes.func,
  onStopGame: PropTypes.func,
  delay: PropTypes.number,
  title: PropTypes.string
}

export default Popup