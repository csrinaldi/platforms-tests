import {createAction, props} from '@ngrx/store';


export enum ChatActionTypes {
  ChatConnectionRequest = '[Chat] Connection Request',
  ChatConnectionRequestSuccess = '[Chat] Chat Connection Request Success',
  ChatConnectionRequestFailure = '[Chat] Chat Connection Request Failure'
}

/**
 * Represent an Request to connect with the server with server URL, and JWT token
 */
export const chatConnectionRequest = createAction(
  ChatActionTypes.ChatConnectionRequest,
  props<{ url: string, token: string }>()
);


/**
 * Represent an Request Success of Load a set of courses
 */
export const chatConnectionRequestSuccess = createAction(
  ChatActionTypes.ChatConnectionRequest
);
