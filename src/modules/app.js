import { baseApi } from '@utilities/axios'

export default () => ({
  metaModule: true,
  name: 'app',

  metaStates: {
    mode: 'light',
    is_x: false,
    selected_marks: Array(9).fill(''),
    is_round_end: false,
    start_game: false,
    show_players_modal: false,
    game_info: [],
    history: [],
    history_loaded: false,
    show_history: false,
    players_name: ['', ''],
    game: {
      round: 1,
      draw: 0,
      players: [
        {
          name: null,
          win: 0,
          lose: 0
        },
        {
          name: null,
          win: 0,
          lose: 0
        }
      ],
      info: []
    }
  },

  metaMutations: {
    SET_IS_X: (state, { payload }) => {
      state.is_x = payload
    },

    SET_SELECTED_MARKS: (state, { payload }) => {
      if (payload.length === 9) {
        state.selected_marks = payload
        return
      }

      const [mark, index] = payload
      const tempState = state.selected_marks

      tempState[index] = mark
      state.selected_marks = tempState
    },

    SET_ROUND: (state, { payload }) => {
      state.round = payload
    },

    SET_IS_ROUND_END: (state, { payload }) => {
      state.is_round_end = payload
    },

    SET_GAME: (state, { payload }) => {
      state.game = payload
    },

    SET_GAME_INFO: (state, { payload }) => {
      state.game_info = payload
    },

    SET_START_GAME: (state, { payload }) => {
      state.start_game = payload
    },

    SET_SHOW_PLAYERS_MODAL: (state, { payload }) => {
      state.show_players_modal = payload
    },

    SET_HISTORY: (state, { payload }) => {
      // state.history = [
      //   ...state.history,
      //   payload
      // ]

      state.history = payload
    },

    SET_SHOW_HISTORY: (state, { payload }) => {
      state.show_history = payload
    },

    SET_PLAYERS_NAME: (state, { payload }) => {
      state.players_name = payload
    },

    SET_HISTORY_LOADED: (state, { payload }) => {
      state.history_loaded = payload
    }
  },

  metaGetters: {},

  metaActions: {
    async resetGame ({ commit, state }) {
      const game = {}
      game.round = state.game.round
      game.draw = state.game.draw + (state.game_info.draw ? 1 : 0)
      game.info = state.game_info.round === state.game.info.length
        ? [state.game_info]
        : [...state.game.info, state.game_info]

      game.players = [
        { name: state.game.players[0].name },
        { name: state.game.players[1].name }
      ]

      const winIndex = state.game_info.win === 'player_1' ? 0 : 1
      game.players[winIndex].win = state.game.players[winIndex].win + (!state.game_info.draw ? 1 : 0)
      game.players[winIndex].lose = state.game.players[winIndex].lose
      
      const loseIndex = state.game_info.win === 'player_1' ? 1 : 0
      game.players[loseIndex].lose = state.game.players[loseIndex].lose + (!state.game_info.draw ? 1 : 0)
      game.players[loseIndex].win = state.game.players[loseIndex].win

      try {
        console.log('save to databse:', game)
        const res = await baseApi.post('/tic-tac-toe', game)
        console.log('res --->', res)

        const defaultData = {
          round: 1,
          draw: 0,
          players: [
            {
              name: null,
              win: 0,
              lose: 0
            },
            {
              name: null,
              win: 0,
              lose: 0
            }
          ],
          info: []
        }

        commit('SET_GAME', defaultData)
        commit('SET_IS_X', false)
        commit('SET_IS_ROUND_END', false)
        commit('SET_GAME_INFO', [])
      } catch (error) {
        console.log('resetGame error:', error)
        throw error
      }
    },

    nextRound ({ commit, state }, info) {
      const game = {}

      game.round = state.game.round + 1
      game.draw = state.game.draw + (info.draw ? 1 : 0)
      game.info = [...state.game.info, info]

      // remove duplicate objects
      game.info = game.info.filter((obj1, i, arr) => 
        arr.findIndex(obj2 => (obj2.round === obj1.round)) === i
      )

      game.players = [
        { name: state.game.players[0].name },
        { name: state.game.players[1].name }
      ]
      
      const winIndex = info.win === 'player_1' ? 0 : 1
      game.players[winIndex].win = state.game.players[winIndex].win + (!info.draw ? 1 : 0)
      game.players[winIndex].lose = state.game.players[winIndex].lose
      
      const loseIndex = info.win === 'player_1' ? 1 : 0
      game.players[loseIndex].lose = state.game.players[loseIndex].lose + (!info.draw ? 1 : 0)
      game.players[loseIndex].win = state.game.players[loseIndex].win

      commit('SET_GAME', game)
      commit('SET_IS_X', false)
      commit('SET_IS_ROUND_END', false)
      commit('SET_GAME_INFO', [])
    },

    async getHistory ({ commit }) {
      try {
        const res = await baseApi.get('/tic-tac-toe')
        commit('SET_HISTORY', res.data.reverse())
        commit('SET_HISTORY_LOADED', true)
      } catch (error) {
        console.log('getHistory error:', error)
        throw error
      }
    }
  }
})