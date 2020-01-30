import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {CoursesService} from '../../..';
import {Injectable} from '@angular/core';
import {EMPTY} from 'rxjs';
import {CourseActions} from '../actions';
import {loadCoursesRequestSuccess} from "../actions/courses.actions";

@Injectable()
export class CoursesEffects {

  constructor(private coursesService: CoursesService, private actions$: Actions) {
  }

  /**
   * Effect for courses request
   */
  loadCoursesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.loadCoursesRequest.type),
    mergeMap(() => {
      console.log("En el Efecto!!!")
      return this.coursesService.getAll()
        .pipe(
          map(courses => loadCoursesRequestSuccess({courses})),
          catchError(() => EMPTY)
        )
    })
    )
  );


}
