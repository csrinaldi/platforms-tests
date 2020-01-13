import {createAction, props} from '@ngrx/store';
import {User} from '../../domain/user';

export const loadAccountsRequest = createAction('[Accounts] Load Accounts Request');
export const loadAccountsSuccess = createAction('[Accounts] Load Accounts Success', props<{accounts: User[]}>());
export const loadAccountsFailure = createAction('[Accounts] Load Accounts Failure', props<{error: Error}>());
export const deleteAccountRequest = createAction('[Accounts] Delete Accounts Request', props<{account: User}>());
export const deleteAccountSuccess = createAction('[Accounts] Delete Accounts Success', props<{accounts: User[]}>());
export const deleteAccountFailure = createAction('[Accounts] Delete Accounts Failure' , props<{error: Error}>());


