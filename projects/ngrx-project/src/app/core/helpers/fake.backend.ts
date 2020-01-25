import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from "rxjs/operators";
import {User} from "../domain/user";
import {EmailPasswordCredentials} from "../domain/emailPasswordCredentials";
import {Principal} from "../domain/principal";

const user = new User();
user.id = '1';
user.username = 'csrinaldi';
user.lastName = 'Rinaldi';
user.firstName = 'Cristian';
user.password = '1q2w3e4r';

const users: User[] = [user];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {


    const {url, method, headers, body} = request;

    console.log(url);

    // array in local storage for registered users
    // let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(
        mergeMap(handleRoute),
        materialize(),
        delay(500),
        dematerialize()
      );

    function handleRoute() {
      switch (true) {
        case url.endsWith('/api/login') && request.method === 'POST':
          return authenticate();
        case url.endsWith('/api/logout') && request.method === 'POST':
          return ok(true)
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }


    function authenticate() {
      const credentials: EmailPasswordCredentials = body;
      console.log(credentials);
      const user = users.find(x => x.username === credentials.username && x.password === credentials.password);
      if (!user) return error('Username or password is incorrect');

      const principal: Principal = new Principal();
      principal.user = user;
      principal.token = 'fake-jwt-token';

      return ok(principal);
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }





    //   if (request.url.endsWith('/api/logoutRequest') && request.method === 'POST') {
    //
    //     console.log(request.body);
    //
    //     /*let filteredUsers = users.filter(user => {
    //         return user.username === request.body.username;
    //     });
    //
    //     if (filteredUsers.length) {
    //         // if loginRequest details are valid return 200 OK with user details and fake jwt token
    //         let user = filteredUsers[0];
    //         return of(new HttpResponse({status: 200, body: {}}));
    //     } else {
    //         // else return 400 bad request
    //         return Observable.throwError('Username or password is incorrect');
    //     }*/
    //
    //     return of(new HttpResponse({status: 200, body: {}}));
    //   }
    //
    //   // get users
    //   if (request.url.endsWith('/api/users') && request.method === 'GET') {
    //     // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
    //     if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
    //       return of(new HttpResponse({status: 200, body: users}));
    //     } else {
    //       // return 401 not authorised if token is null or invalid
    //       return throwError('Unauthorised');
    //     }
    //   }
    //
    //
    //   // // get user by id
    //   // if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
    //   //   // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    //   //   if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
    //   //     // find user by id in users array
    //   //     const urlParts = request.url.split('/');
    //   //     const id = parseInt(urlParts[urlParts.length - 1]);
    //   //     const matchedUsers = users.filter(user => {
    //   //       return user.id === id;
    //   //     });
    //   //     const user = matchedUsers.length ? matchedUsers[0] : null;
    //   //
    //   //     return of(new HttpResponse({status: 200, body: user}));
    //   //   } else {
    //   //     // return 401 not authorised if token is null or invalid
    //   //     return throwError('Unauthorised');
    //   //   }
    //   // }
    //
    //   // // create user
    //   // if (request.url.endsWith('/api/users') && request.method === 'POST') {
    //   //   // get new user object from post body
    //   //   const newUser = request.body;
    //   //
    //   //   // validation
    //   //   const duplicateUser = users.filter(user => {
    //   //     return user.username === newUser.username;
    //   //   }).length;
    //   //   if (duplicateUser) {
    //   //     return throwError('Username "' + newUser.username + '" is already taken');
    //   //   }
    //   //
    //   //   // save new user
    //   //   newUser.id = users.length + 1;
    //   //   users.push(newUser);
    //   //   localStorage.setItem('users', JSON.stringify(users));
    //   //
    //   //   // respond 200 OK
    //   //   return of(new HttpResponse({status: 200}));
    //   // }
    //
    //   // delete user
    //   // if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
    //   //   // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    //   //   if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
    //   //     // find user by id in users array
    //   //     const urlParts = request.url.split('/');
    //   //     const id = parseInt(urlParts[urlParts.length - 1]);
    //   //     for (let i = 0; i < users.length; i++) {
    //   //       const user = users[i];
    //   //       if (user.id === id) {
    //   //         // delete user
    //   //         users.splice(i, 1);
    //   //         localStorage.setItem('users', JSON.stringify(users));
    //   //         break;
    //   //       }
    //   //     }
    //   //
    //   //     // respond 200 OK
    //   //     return of(new HttpResponse({status: 200}));
    //   //   } else {
    //   //     // return 401 not authorised if token is null or invalid
    //   //     return throwError('Unauthorised');
    //   //   }
    //   // }
    //
    //
    //   // pass through any requests not handled above
    //   return next.handle(request);
    // }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
