import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';

import {from} from 'rxjs';
import {map} from 'rxjs/operators';
import {Server} from 'socket.io';

@WebSocketGateway({ transports: ['websocket'] })
export class EventsGateway implements OnGatewayDisconnect, OnGatewayConnection{
    @WebSocketServer() server;

    @SubscribeMessage('events')
    findAll(client, data): any {
        console.log('in findAll');
        return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }


    afterInit(server: any): any {
        console.log('Server', server);
    }

    handleConnection(client: any, ...args: any[]): any {

        // console.log('Connection ', client);
        //console.log(args);

    }

    handleDisconnect(client: any): any {
        // console.log('Disconnect: ', client);
    }
}
