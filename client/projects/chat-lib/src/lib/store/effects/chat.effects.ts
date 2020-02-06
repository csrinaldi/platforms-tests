import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {ChatActions} from '../actions';
import {ChatLibService} from '../../services/chat-lib.service';
import {map, switchMap} from 'rxjs/operators';
import {chatConnectionRequestSuccess} from '../actions/chat.actions';

@Injectable()
export class ChatEffects {

  constructor(private chatService: ChatLibService, private actions$: Actions) {
  }

  /**
   * Effect for courses request
   */
  connectToChatEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ChatActions.chatConnectionRequest.type),
      // map(({url, token}) => {
      //   const wsUrl = (url as string).replace(/^http/, 'ws');
      //   return { url: wsUrl, token};
      // }),
      switchMap(({url, token}) => {
          console.log('url - token', {url, token});
          return this.chatService.connect(url, token)
            .pipe(
              map(() => {
                return chatConnectionRequestSuccess();
              })
            );
        }
      )
    )
  );
}
