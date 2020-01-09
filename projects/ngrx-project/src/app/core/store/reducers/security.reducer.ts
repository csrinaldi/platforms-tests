import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as SecurityActions from '../actions/security.actions';
import {Principal} from "../../domain/principal";

export const securityFeatureKey = 'security';

export interface SecurityState {
  principal: Principal,
  loggedIn: boolean,
  loading: boolean,
  hasError: boolean,
  error: string
}

const initialState: SecurityState = {
  principal: undefined,
  loggedIn: false,
  loading: false,
  hasError: false,
  error: ""
};

export const securityReducer = createReducer(
  initialState,
  on(SecurityActions.loginRequest, (state: SecurityState) => (state)),
  on(SecurityActions.login, (state: SecurityState) => ({...state, loading: true })),
  on(SecurityActions.loginSuccess, (state: SecurityState, {principal}) => ({...state, loading: false, principal: principal, loggedIn: true })),
  on(SecurityActions.loginFailure, (state: SecurityState, {error}) => ({...state, loading: false, loggedIn: false, error: error, hasError: true })),
  on(SecurityActions.logout, (state: SecurityState) => ({...state, loading: true })),
  on(SecurityActions.logoutSuccess, (state: SecurityState) => ({...state, loading: false, principal: undefined, loggedIn: false }))
);

export const securityFeature = createFeatureSelector<SecurityState>(securityFeatureKey);

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


