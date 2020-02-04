import {createAction, props} from '@ngrx/store';
import {Principal} from '../../domain/principal';
import {Credentials} from '../../domain/credentials';

export const loginViewRequest = createAction('[Security] Login View Request');
export const loginRequest = createAction('[Security] Login Request', props<{ credentials: Credentials }>());
export const loginSuccess = createAction('[Security] Login Success', props<{ principal: Principal }>());
export const loginFailure = createAction('[Security] Login Failure', props<{ error: Error }>());
export const logoutRequest = createAction('[Security] Logout Request');
export const logoutSuccess = createAction('[Security] Logout Success');
export const logoutFailure = createAction('[Security] Logout Failure', props<{ error: Error }>());

