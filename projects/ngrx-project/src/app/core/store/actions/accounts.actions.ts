import {createAction, props} from '@ngrx/store';
import {User} from '../../domain/user';

export const loadAccountsRequest = createAction('[Accounts] Load Accounts Request');
export const loadAccountsSuccess = createAction('[Accounts] Load Accounts Success', props<{accounts: User[]}>());
export const loadAccountsFailure = createAction('[Accounts] Load Accounts Failure', props<{error: Error}>());


