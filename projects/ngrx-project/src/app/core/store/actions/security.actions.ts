import {createAction, props} from '@ngrx/store';
import {Principal} from "../../domain/principal";

export const login = createAction('[Security] Login');
export const loginSuccess = createAction('[Security] Login Success', props<{principal: Principal}>());
export const logout = createAction('[Security] Logout');
export const logoutSuccess = createAction('[Security] Logout Success');

