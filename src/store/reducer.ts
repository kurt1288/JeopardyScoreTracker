import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Points = [
  {
    200: number,
    400: number,
    600: number,
    800: number,
    1000: number
  },
  {
    400: number,
    800: number,
    1200: number,
    1600: number,
    2000: number
  },
  {
    5000: number
  }
];

interface Player {
  name: string;
  points: Points;
  score: number;
}

interface AwardPoints {
  player: Player,
  points: number
}

const NewPlayer = (name: string): Player => {
  return {
    name: name,
    points: [
      {
          200: 0,
          400: 0,
          600: 0,
          800: 0,
          1000: 0
      },
      {
          400: 0,
          800: 0,
          1200: 0,
          1600: 0,
          2000: 0
      },
      {
          5000: 0
      }
    ],
    score: 0
  }
}

export const initialState = {
  players: Array<Player>(),
  round: 0,
  pointSelected: 0
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    newGame: state => initialState,
    nextRound: state => {
      state.round++;
    },
    previousRound: state => {
        state.round--;
    },
    changePointSelected: (state, {payload}: PayloadAction<number>) => {
        state.pointSelected = payload
    },
    addPlayer: (state, {payload}: PayloadAction<string>) => {
      state.players.push(NewPlayer(payload));
      state.pointSelected = 0;
    },
    givePointsToPlayer: (state, {payload}: PayloadAction<AwardPoints>) => {
      const player = state.players.find(x => x.name === payload.player.name) as Player;
      player.score += payload.points;

      if (payload.points < 0)
        (player.points[state.round - 1] as any)[payload.points * -1]--;
      else
        (player.points[state.round - 1] as any)[payload.points]++;

      state.pointSelected = 0;
    }
  }
});

export const { nextRound, previousRound, changePointSelected, addPlayer, givePointsToPlayer, newGame } = gameSlice.actions;

export default gameSlice.reducer;