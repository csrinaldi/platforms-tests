/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(
    private socket: Socket) {
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

}
