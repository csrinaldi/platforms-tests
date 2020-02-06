import {Injectable} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatLibService {

  connection$: WebSocketSubject<any>;
  RETRY_SECONDS = 10;

  constructor() {
  }

  connect(url: string, token: string): Observable<any> {
    if (url === undefined || url === '' || token === undefined || token === '') {
      throw new Error('Error en los parametros de coneccion');
    }

    if (this.connection$) {
      return this.connection$;
    } else {
      this.connection$ = webSocket(url);
      return this.connection$;
    }
  }
}
