import {Action, createReducer, createSelector, on} from '@ngrx/store';

import { LayoutActions } from '../actions';

export const layoutFeatureKey = 'layout';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: true,
};

// export const reducer = createReducer(
//   initialState,
//   // Even thought the `state` is unused, it helps infer the return type
//   on(LayoutActions.closeSidenav, state => ({ showSidenav: false })),
//   on(LayoutActions.openSidenav, state => ({ showSidenav: true })),
//   on(LayoutActions.toggleSidenav, (state: State) => {
//     console.log( "Ejecutando el reducer!!!!! ")
//     const s  = {...state, showSidenav: !state.showSidenav }
//     console.log(s);
//     return s;
//   })
// );

const layoutReducer = createReducer(
  initialState,
  on(LayoutActions.toggleSidenav, state => ({ ...state, showSidenav: !state.showSidenav }))
  // on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
  // on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
  // on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
);

export function reducer(state: State | undefined, action: Action) {
  return layoutReducer(state, action);
}

export const state = (state: State) => state;

export const selectShowSidenav = createSelector(
  state,
  (state: State) => state.showSidenav
);
