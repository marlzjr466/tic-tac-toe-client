import { useEffect, useRef } from 'react'

// images
import FrameBg from '@assets/images/frame.png'
import Logo from '@assets/images/logo.png'
import X from '@assets/images/x.png'
import O from '@assets/images/circle.png'

// hooks
import useTicTactToe from '@hooks/useTicTactToe'

// modal
import Popup from '@modals/popup'

// components
import History from '@components/history'
import Footer from '@components/footer'

function Frame () {
  const { metaStates, metaMutations } = window.$reduxMeta.useMeta()
  const { placeMark, startGame, stopGame, win, draw, nextRound, checkIsWin } = useTicTactToe()
  
  const gridItems = useRef([])
  
  const meta = {
    ...metaStates('app', [
      'is_x',
      'selected_marks',
      'game',
      'is_round_end',
      'game_info',
      'start_game',
      'show_players_modal',
      'show_history',
      'players_name'
    ]),
    ...metaMutations('app', [
      'SET_IS_X',
      'SET_SHOW_PLAYERS_MODAL',
      'SET_SHOW_HISTORY',
      'SET_PLAYERS_NAME'
    ])
  }

  useEffect(() => {
    const mark = meta.is_x ? X : O
    const { isWin, pattern } = checkIsWin(meta.selected_marks, mark)
    if (isWin) {
      return win(pattern, gridItems)
    }
    
    if (meta.selected_marks.every(item => item)) {
      return draw()
    }
    
    meta.SET_IS_X(!meta.is_x)
  }, [meta.selected_marks])

  return (
    <>
      <div className="frame">
        <div className="frame__content">
          <img src={FrameBg} alt="Frame bg" className="frame__content--bg" />
          <img src={Logo} alt="Logo" className="frame__content--logo" />

          <div className="frame__content--wrapper">
            {
              meta.start_game
                ? <div className="grid" game-round={`round ${meta.game.round}`}>
                  {
                    meta.selected_marks.map((item, i) => {
                      return (
                        <span
                          key={i}
                          ref={el => gridItems.current[i] = el}
                          onClick={() => placeMark(i)}
                        >
                          { item && <img src={item} alt="image" className="mark" /> }
                        </span>
                      )
                    })
                  }
                </div>
                : meta.show_history
                  ? <History />
                  : <div className="btns">
                    <button onClick={() => meta.SET_SHOW_PLAYERS_MODAL(true)}>start new game</button>
                    <button onClick={() => meta.SET_SHOW_HISTORY(true)}>history</button>
                  </div>
            }
          </div>
          
          { meta.start_game && <Footer /> }
        </div>
      </div>

      {
        meta.show_players_modal &&
          <Popup
            title="player's name"
            delay={200}
          >
            <div className="popup__content--form">
              <span>
                <label htmlFor="player_1">player 1</label>
                <input
                  type="text"
                  id="player_1"
                  onChange={e => {
                    const temp = [e.target.value, meta.players_name[1]]
                    meta.SET_PLAYERS_NAME(temp)
                  }}
                />
              </span>

              <span>
                <label htmlFor="player_2">player 2</label>
                <input
                  type="text"
                  id="player_2"
                  onChange={e => {
                    const temp = [meta.players_name[0], e.target.value]
                    meta.SET_PLAYERS_NAME(temp)
                  }}
                />
              </span>
            </div>
            <button
              onClick={startGame}
            >start</button>
          </Popup>
      }

      {
        meta.is_round_end &&
          <Popup
            player={{
              name: meta.game.players[meta.is_x ? 0 : 1].name,
              type: meta.is_x ? 1 : 2
            }}
            draw={meta.game_info.draw || false}
            onNextRound={() => nextRound(gridItems)}
            onStopGame={() => stopGame(gridItems)}
            delay={1500}
            title={meta.game_info.draw ? 'no winners' : 'congratulations'}
          />
      }
    </>
  )
}

export default Frame