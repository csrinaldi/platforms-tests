import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as AccountActions from '../actions/accounts.actions';
import {User} from '../../domain/user';

export const accountsFeatureKey = 'accounts';

export interface AccountState {
  accounts: User[];
  loading: boolean;
  hasError: boolean;
  error: Error;
}

const initialState: AccountState = {
  accounts: [
    <User>{ 'firstName': 'Cristian', "lastName": 'Rinaldi', "username" : 'csrinaldi' },
    <User>{ 'firstName': 'John', "lastName": 'Doe', "username" : 'jdoe' }
  ],
  loading: false,
  hasError: false,
  error: undefined
};

export const acccoutsReducer = createReducer(
  initialState,
  on(AccountActions.loadAccountsRequest, (state: AccountState) => ({...state, loading: true })),
  on(AccountActions.loadAccountsSuccess, (state: AccountState, {accounts}) => ({...state, loading: false, accounts })),
  on(AccountActions.loadAccountsFailure, (state: AccountState, {error}) => ({...state, loading: false, error, hasError: true, accounts: [] })),
  on(AccountActions.deleteAccountRequest, (state: AccountState, {account}) => ({...state, loading: true})),
  on(AccountActions.deleteAccountSuccess,(state: AccountState, {accounts}) => ({...state, loading: false, accounts })),
  on(AccountActions.deleteAccountFailure,(state: AccountState, {error}) => ({...state, loading: false, error, hasError: true })),
);

export const accountsFeature = createFeatureSelector<AccountState>(accountsFeatureKey);

export const accounts = createSelector(
  accountsFeature,
  (s1 => s1.accounts)
);

export const hasAccountErrors = createSelector(
  accountsFeature,
  (s1 => s1.hasError)
);

export const accountsLoading = createSelector(
  accountsFeature,
  (s1 => s1.loading)
);


