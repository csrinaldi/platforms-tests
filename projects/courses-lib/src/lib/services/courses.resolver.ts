import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {Course} from '../model/course';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {courses, CoursesState, loaded} from '../store/reducers/courses.reducers';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/operators';
import {loadCoursesRequest} from '../store/actions/courses.actions';

@Injectable()
export class CoursesResolver implements Resolve<Observable<Course[]>> {

  constructor(private store: Store<CoursesState>) {
  }

  getStoreOrApi(): Observable<Course[]> {
    return this.store.pipe(
      select(loaded),
      switchMap((value: boolean) => {
        if ( value ) {
          return this.store.select(courses);
        }else{
          this.store.dispatch(loadCoursesRequest());
        }
      }),
      take(1)
    )
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course[]>{
    return this.getStoreOrApi().pipe(
      switchMap( (courses) => {
        return of(courses)
      }),
      catchError(err => {
        throw err;
      })
    )

    // return this.store.pipe(
    //     select(loaded),
    //     switchMap<boolean, Observable<Course[]>>((value, index) => {
    //       if (value) {
    //         console.log("Buscando");
    //         return this.store.pipe(
    //           select(courses),
    //           filter(courses => {
    //             console.log("Filtrando ", courses);
    //             console.log(!!courses);
    //
    //             return !!courses
    //           }),
    //           map( value1 => {
    //             return [];
    //           })
    //         )
    //           // .pipe(
    //           //   map (( courses) => {
    //           //     console.log("Encontrado:    ", courses);
    //           //     return [];
    //           //   })
    //           // );
    //       } else {
    //         console.log("haciendo dispatch")
    //         this.store.dispatch(loadCoursesRequest());
    //         return EMPTY;
    //       }
    //     }),
    //     take(1),
    //     catchError(err => {
    //       console.log("----------------------")
    //       console.log(err);
    //       console.log("----------------------")
    //       throw err;
    //     })
    // )
  }
}
