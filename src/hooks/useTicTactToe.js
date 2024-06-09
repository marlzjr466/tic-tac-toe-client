// images
import X from '@assets/images/x.png'
import O from '@assets/images/circle.png'

export default () => {
  const { metaStates, metaMutations, metaActions } = window.$reduxMeta.useMeta()
  const meta = {
    ...metaStates('app', [
      'is_x',
      'selected_marks',
      'game',
      'is_round_end',
      'game_info',
      'start_game',
      'players_name'
    ]),
    ...metaMutations('app', [
      'SET_SELECTED_MARKS',
      'SET_GAME',
      'SET_IS_ROUND_END',
      'SET_GAME_INFO',
      'SET_START_GAME',
      'SET_SHOW_PLAYERS_MODAL',
      'SET_PLAYERS_NAME'
    ]),
    ...metaActions('app', [
      'resetGame',
      'nextRound'
    ])
  }

  const WINNING_PATTERNS = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal
    [0, 4, 8],
    [2, 4, 6]
  ]

  return {
    placeMark (i) {
      if (meta.selected_marks[i] || meta.is_round_end) {
        return
      }
  
      meta.SET_SELECTED_MARKS([meta.is_x ? X : O, i])
    },

    startGame () {
      if (!meta.players_name[0] || !meta.players_name[1]) {
        return
      }
  
      const { round, draw, info, players } = meta.game
      const game = {
        round,
        draw,
        info,
        players: players.map((item, i) => ({
          name: meta.players_name[i],
          win: item.win,
          lose: item.lose
        }))
      }
      
      meta.SET_GAME(game)
      meta.SET_SHOW_PLAYERS_MODAL(false)
      meta.SET_START_GAME(true)
      meta.SET_PLAYERS_NAME(['', ''])
    },

    async stopGame (gridItems) {
      await meta.resetGame()
      meta.SET_SELECTED_MARKS(Array(9).fill(''))
      meta.SET_START_GAME(false)
      gridItems.current.forEach(item => {
        item.classList.remove('lost')
      })
    },

    nextRound (gridItems) {
      meta.nextRound(meta.game_info)
      meta.SET_SELECTED_MARKS(Array(9).fill(''))
      gridItems.current.forEach(item => {
        item.classList.remove('lost')
      })
    },

    win (pattern, gridItems) {
      meta.SET_IS_ROUND_END(true)
      gridItems.current.forEach((item, i) => {
        if (!pattern.includes(i)) {
          item.classList.add('lost')
        }
      })

      meta.SET_GAME_INFO({
        round: meta.game.round,
        win: meta.is_x ? 'player_1' : 'player_2',
        pattern,
        draw: false,
        selected_marks: meta.selected_marks
      })
    },

    draw () {
      meta.SET_IS_ROUND_END(true)
      meta.SET_GAME_INFO({
        round: meta.game.round,
        win: null,
        pattern: [],
        draw: true,
        selected_marks: meta.selected_marks
      })
    },

    checkIsWin (selectedMarks, mark) {
      let winningPattern = []

      const res = WINNING_PATTERNS.some(pattern => {
        const isWin = pattern.every(index => selectedMarks[index] === mark)
        
        if (isWin) {
          winningPattern = pattern
        }
          
        return isWin
      })

      return {
        isWin: res,
        pattern: winningPattern
      }
    }
  }
}