import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {CoursesService} from '../../..';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {CourseActions} from '../actions';
import {loadCoursesRequestFailure, loadCoursesRequestSuccess} from '../actions/courses.actions';

@Injectable()
export class CoursesEffects {

  constructor(private coursesService: CoursesService, private actions$: Actions) {
  }

  /**
   * Effect for courses request
   */
  loadCoursesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.loadCoursesRequest.type),
    exhaustMap(() => {
      console.log('En el Efecto');
      return this.coursesService.getAll().pipe(
        map(courses => {
          console.log('Lanzando una actions', courses);
          return loadCoursesRequestSuccess({courses});
        }),
        catchError((errors) => {
          console.log('Estamos manejando el error');
          return of(loadCoursesRequestFailure({errors: []}));
        })
      );
    })
    )
  );


}
