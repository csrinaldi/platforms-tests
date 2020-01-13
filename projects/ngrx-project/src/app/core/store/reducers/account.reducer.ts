import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as AccountActions from '../actions/accounts.actions';
import {Principal} from '../../domain/principal';
import {User} from '../../domain/user';

export const accountsFeatureKey = 'accounts';

export interface AccountState {
  accounts: User[];
  loading: boolean;
  hasError: boolean;
  error: Error;
}

const initialState: AccountState = {
  accounts: [],
  loading: false,
  hasError: false,
  error: undefined
};

export const authReducer = createReducer(
  initialState,
  on(AccountActions.loadAccountsRequest, (state: AccountState) => ({...state, loading: true })),
  on(AccountActions.loadAccountsSuccess, (state: AccountState, {accounts}) => ({...state, loading: false, accounts })),
  on(AccountActions.loadAccountsFailure, (state: AccountState, {error}) => ({...state, loading: false, error, hasError: true, accounts: [] })),
);

export const accoutsFeature = createFeatureSelector<AccountState>(accountsFeatureKey);

export const accounts = createSelector(
  accoutsFeature,
  (s1 => s1.accounts)
);

export const hasErrors = createSelector(
  accoutsFeature,
  (s1 => s1.hasError)
);

export const loading = createSelector(
  accoutsFeature,
  (s1 => s1.loading)
);


