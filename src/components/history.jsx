import { useEffect } from 'react'

// images
import X from '@assets/images/x.png'
import O from '@assets/images/circle.png'

function History () {
  const { metaStates, metaMutations, metaActions } = window.$reduxMeta.useMeta()

  const meta = {
    ...metaStates('app', [
      'history',
      'history_loaded'
    ]),
    ...metaMutations('app', [
      'SET_SHOW_HISTORY',
      'SET_HISTORY_LOADED'
    ]),
    ...metaActions('app', ['getHistory'])
  }

  useEffect(() => {
    meta.SET_HISTORY_LOADED(false)
    meta.getHistory()
  }, [])

  return (
    <>
      <div className="history">
        <span className="history__title">
          <pre onClick={() => meta.SET_SHOW_HISTORY(false)}>{'< '}back</pre>
          history
        </span>

        <ul>
          {
            meta.history.length
              ? meta.history.map((item, key) => {
                return (
                  <li key={key}>
                    <details>
                      <summary className="game-info">
                        <div className="player-info">
                          <img src={X} alt="User" />
                          <div>
                            { item.players[0].name }
                            <span>player 1</span>
                          </div>
                        </div>

                        <div className="game-status">
                          <div className="game-status__item">
                            <div>
                              { item.players[0].win }
                              <span>win</span>
                            </div>
                            <div>
                              { item.players[0].lose }
                              <span>lose</span>
                            </div>
                          </div>

                          <div className="game-status__item">
                            <div>
                              { item.draw }
                              <span>draw</span>
                            </div>
                          </div>

                          <div className="game-status__item">
                            <div>
                              { item.players[1].lose }
                              <span>lose</span>
                            </div>
                            <div>
                              { item.players[1].win }
                              <span>win</span>
                            </div>
                          </div>
                        </div>

                        <div className="player-info reverse">
                          <img src={O} alt="User" />
                          <div>
                            { item.players[1].name }
                            <span>player 2</span>
                          </div>
                        </div>
                      </summary>

                      <div className="round-wrapper">
                        {
                          item.info.map((info, j) => {
                            return (
                              <div className="round-info" key={j}>
                                <span>round { info.round }</span>
                                <div className="grid">
                                  {
                                    info.selected_marks.map((src, i) => {
                                      return <span key={i} className={!info.pattern.includes(i) ? 'lost' : ''}>
                                        { src && <img src={src} alt="image" className="mark" /> }
                                      </span>
                                    })
                                  }
                                </div>
                                <span>
                                  {
                                    info.draw
                                      ? 'draw'
                                      : `player ${info.win === 'player_1' ? 1 : 2} wins`
                                  }
                                </span>
                              </div>
                            )
                          })
                        }
                      </div>
                    </details>
                  </li>
                )
              })
              : <li className="no-data">{ meta.history_loaded ? 'no recent games' : 'fetching recent games...' }</li>
          }
          
        </ul>
      </div>
    </>
  )
}

export default History