import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Course} from '../model/course';


const courses = [
  <Course> {id: 1, name: 'Angular', description: 'Angular Course for Dummy'},
  <Course> {id: 2, name: 'React', description: 'React Course for Dummy'},
  <Course> {id: 3, name: 'Vue', description: 'Vue Course for Dummy'}
];


@Injectable()
export class CoursesFakeBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (request.url.endsWith('/courses') && request.method === 'GET') {
      return of(new HttpResponse({status: 200, body: courses}));
    }

    // pass through any requests not handled above
    return next.handle(request);

  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: CoursesFakeBackendInterceptor,
  multi: true
};
