import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Course} from '../model/course';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {courses, CoursesState, loaded} from '../store/reducers/courses.reducers';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {loadCoursesRequest} from '../store/actions/courses.actions';

@Injectable()
export class CoursesResolver implements Resolve<Observable<Course[]>> {

  constructor(private store: Store<CoursesState>) {
  }

  getStoreOrApi(): Observable<Course[]> {
    return this.store.pipe(
      select(loaded),
      tap((value: boolean) => {
        console.log('Valor de carga; ', value);
        if (!value) {
          this.store.dispatch(loadCoursesRequest());
        }
      }),
      filter(value => value),
      switchMap(() => this.store.select(courses)),
      take(1)
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course[]> {
    return this.getStoreOrApi().pipe(
      filter(value => !!value),
      switchMap((courses) => {
        return of(courses);
      }),

      catchError(err => {
        throw err;
      })
    );
  }
}
