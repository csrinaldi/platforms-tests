import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {CoursesService} from '../../..';
import {Injectable} from '@angular/core';
import {EMPTY} from 'rxjs';
import {CourseActions} from '../actions';

@Injectable()
export class CoursesEffects {

  constructor(private coursesService: CoursesService, private actions$: Actions) {
  }

  /**
   * Effect for courses request
   */
  loadCoursesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(CourseActions.loadCoursesRequest.type),
    mergeMap(() => this.coursesService.getAll()
      .pipe(
        map(courses => ({type: CourseActions.loadCoursesRequestSuccess.type, payload: courses})),
        catchError(() => EMPTY)
      ))
    )
  );


}
