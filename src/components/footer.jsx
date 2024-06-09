// images
import X from '@assets/images/x.png'
import O from '@assets/images/circle.png'

function Footer () {
  const { metaStates } = window.$reduxMeta.useMeta()

  const meta = {
    ...metaStates('app', ['game'])
  }

  return (
    <>
      <div className="frame__content--footer">
        <div className="player-info">
          <img src={X} alt="User" />
          <div>
            { meta.game.players[0].name || '-----' }
            <span>player 1</span>
          </div>
        </div>

        <div className="game-status">
          <div className="game-status__item">
            <div>
              { meta.game.players[0].win }
              <span>win</span>
            </div>
            <div>
              { meta.game.players[0].lose }
              <span>lose</span>
            </div>
          </div>

          <div className="game-status__item">
            <div>
              { meta.game.draw }
              <span>draw</span>
            </div>
          </div>

          <div className="game-status__item">
            <div>
              { meta.game.players[1].lose }
              <span>lose</span>
            </div>
            <div>
              { meta.game.players[1].win }
              <span>win</span>
            </div>
          </div>
        </div>

        <div className="player-info reverse">
          <img src={O} alt="User" />
          <div>
            { meta.game.players[1].name || '-----' }
            <span>player 2</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer