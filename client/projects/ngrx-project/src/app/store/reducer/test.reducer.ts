import {Action, createAction, createReducer, on} from '@ngrx/store';

export const homeScore = createAction('[Scoreboard Page] Home Score');
export const awayScore = createAction('[Scoreboard Page] Away Score');
export const resetScore = createAction('[Scoreboard Page] Score Reset');

export interface State {
  home: number;
  away: number;
};

export const initialState: State = {
  home: 0,
  away: 0,
};

const scoreboardReducer = createReducer(
  initialState,
  on(homeScore, state => ({...state, home: state.home + 1})),
  on(awayScore, state => ({...state, away: state.away + 1})),
  on(resetScore, state => ({home: 0, away: 0})),
);

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
