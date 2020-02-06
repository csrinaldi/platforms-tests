import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {catchError, delay, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatLibService {

  connection$: WebSocketSubject<any>;
  RETRY_SECONDS = 10;

  constructor() {}

  connect(url: string, token: string): Observable<boolean> {
    // if (url === undefined || url === '' || token === undefined || token === '') {
    //   throw new Error('Error en los parametros de coneccion');
    // }


    if (!this.connection$) {
      this.connection$ = webSocket({
        url: 'ws://localhost:3000',
        openObserver: {
          next: () => {
            console.log('connetion ok');
          }
        },
      });

      if ( this.connection$ ) {
        this.connection$.subscribe(
          msg => this.processMessage(msg), // Called whenever there is a message from the server.
          err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
          () => console.log('complete') // Called when connection is closed (for whatever reason).
        );
      }
      // this.connection$.subscribe(
      //   msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      //   err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      //   () => console.log('complete') // Called when connection is closed (for whatever reason).
      // );
    }

    return of(true);
  }

  send(msg: string) {
    this.connection$.next(msg);
  }

  private processMessage(msg: any) {

  }
}
