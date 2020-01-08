import {createAction, props} from '@ngrx/store';
import {Principal} from "../../domain/principal";
import {Credentials} from "../../domain/credentials";

export const loginRequest = createAction('[Security] Login Request');
export const login = createAction('[Security] Login', props<{credentials: Credentials}>());
export const loginSuccess = createAction('[Security] Login Success', props<{principal: Principal}>());
export const loginFailure = createAction('[Security] Login Failure', props<{error: any}>());
export const logout = createAction('[Security] Logout');
export const logoutSuccess = createAction('[Security] Logout Success');

