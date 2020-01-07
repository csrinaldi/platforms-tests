import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as LayoutActions from '../actions/layout.actions';


export const layoutFeatureKey = 'layout';

export interface CoreState {
  showSidenav: boolean;
  title: string,
  avatar: string,
  logo: string
}

const initialState: CoreState = {
  showSidenav: true,
  title: "Home",
  avatar: "",
  logo: ""

};

export const layoutReducer = createReducer(
  initialState,
  // Even thoughe `state` is unused, it helps infer the return type
  on(LayoutActions.closeSidenav, state => ({ showSidenav: false })),
  on(LayoutActions.openSidenav, state => ({ showSidenav: true })),
  on(LayoutActions.toggleSidenav, (state: CoreState) => ({ ...state, showSidenav: !state.showSidenav})),
  on(LayoutActions.setTitleAction, (state: CoreState, {title}) => ({ ...state, title: title }))
);

export const layoutFeature = createFeatureSelector<CoreState>('layout');

export const showSidenav = createSelector(
  layoutFeature,
  (s1 => s1.showSidenav)
)

export const getTitle = createSelector(
  layoutFeature,
  (s1 => s1.title)
);

