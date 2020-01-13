import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as SecurityActions from '../actions/auth.actions';
import {Principal} from '../../domain/principal';

export const securityFeatureKey = 'security';

export interface AuthState {
  principal: Principal;
  loggedIn: boolean;
  loading: boolean;
  hasError: boolean;
  error: Error;
}

const initialState: AuthState = {
  principal: undefined,
  loggedIn: false,
  loading: false,
  hasError: false,
  error: undefined
};

export const authReducer = createReducer(
  initialState,
  on(SecurityActions.loginViewRequest, (state: AuthState) => ({...state, loading: false })),
  on(SecurityActions.loginRequest, (state: AuthState) => ({...state, loading: true })),
  on(SecurityActions.loginSuccess, (state: AuthState, {principal}) => ({...state, loading: false, principal: principal, loggedIn: true })),
  on(SecurityActions.loginFailure, (state: AuthState, {error}) => ({...state, loading: false, loggedIn: false, error: error, hasError: true })),
  on(SecurityActions.logoutRequest, (state: AuthState) => ({...state })),
  on(SecurityActions.logoutSuccess, (state: AuthState) => ({...state, loading: false, principal: undefined, loggedIn: false })),
  on(SecurityActions.logoutFailure, (state: AuthState, {error} ) => ({...state, error: error}))
);

export const securityFeature = createFeatureSelector<AuthState>(securityFeatureKey);

export const principal = createSelector(
  securityFeature,
  (s1 => s1.principal)
)

export const loggedIn = createSelector(
  securityFeature,
  (s1 => s1.loggedIn)
);

export const loading = createSelector(
  securityFeature,
  (s1 => s1.loading)
);

export const errors = createSelector(
  securityFeature,
  (s1 => s1.error)
);

export const hasErrors = createSelector(
  securityFeature,
  (s1 => s1.hasError)
);


