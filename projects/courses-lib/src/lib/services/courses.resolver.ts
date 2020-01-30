
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {courses, CoursesState, loadingCourses} from '../store/reducers/courses.reducers';
import {switchMap, withLatestFrom} from 'rxjs/operators';
import {loadCoursesRequest} from '../store/actions/courses.actions';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolver implements Resolve<Observable<Course[]>> {

  constructor(private http: HttpClient, private store: Store<CoursesState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course[]> {

    return this.store.select(loadingCourses)
        .pipe(
          switchMap(value => {
            if ( value ) {
              return withLatestFrom(this.store.select(courses));
            } else {
              this.store.dispatch(loadCoursesRequest);
            }
          })
        );
  }




}
