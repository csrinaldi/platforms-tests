import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as LayoutActions from '../actions/layout.actions';


export const layoutFeatureKey = 'layout';

export interface CoreState {
  showSidenav: boolean;
  showToolbar: boolean;
  title: string,
  avatar: string,
  logo: string
}

const initialState: CoreState = {
  showSidenav: true,
  showToolbar: true,
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
  on(LayoutActions.setTitle, (state: CoreState, {title}) => ({ ...state, title: title })),
  on(LayoutActions.showToolbar, (state: CoreState) => ({ ...state, showToolbar: true})),
  on(LayoutActions.hideToolbar, (state: CoreState) => ({ ...state, showToolbar: false})),
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

export const isShowToolbar = createSelector(
  layoutFeature,
  (s1 => s1.showToolbar)
);

