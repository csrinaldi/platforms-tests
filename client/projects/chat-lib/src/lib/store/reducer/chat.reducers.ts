import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {ChatActions} from '../actions';

export const chatFeatureKey = 'chat';

export interface ChatState {
  connected: boolean;
  connecting: boolean;
}

const initialState: ChatState = {
  connected: false,
  connecting: false
};

export const reducer = createReducer(
  initialState,
  on(ChatActions.chatConnectionRequest, (state) => ({...state, connecting: true})),
  on(ChatActions.chatConnectionRequestSuccess, (state) => ({...state, connected: true, connecting: false})),
);

export const chatFeature = createFeatureSelector<ChatState>(chatFeatureKey);


export const chatConnecting = createSelector(
  chatFeature,
  (s1 => s1.connecting)
);

export const chatConnected = createSelector(
  chatFeature,
  (s1 => s1.connected)
);
