import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {CoursesActionTypes, loadCoursesRequest} from "..";
import {CoursesService} from "../../..";
import {Injectable} from "@angular/core";

@Injectable()
export class CoursesEffects {

  loadCoursesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(loadCoursesRequest.type),
    mergeMap(() => this.coursesService.getAll()
      .pipe(
        map(courses => ({ type: CoursesActionTypes.LoadCoursesRequestSuccess, payload: courses })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(private coursesService: CoursesService, private actions$: Actions) {
  }

}
