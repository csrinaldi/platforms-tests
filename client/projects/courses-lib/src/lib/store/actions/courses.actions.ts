import {createAction, props} from '@ngrx/store';
import {Course} from '../../model/course';
import {ListViewMode} from "../reducers/courses.reducers";

export enum CoursesActionTypes {
  LoadCoursesRequest = '[Courses] Load Courses Request',
  LoadCoursesRequestSuccess = '[Courses] Load Courses Request Success',
  LoadCoursesRequestFailure = '[Courses] Load Courses Request Failure',
  ChangeListViewMode = '[Courses - List View] Change List View Mode',
}

/**
 * Represent an Request to Load a set of courses
 */
export const loadCoursesRequest = createAction(
  CoursesActionTypes.LoadCoursesRequest
);


/**
 * Represent an Request Success of Load a set of courses
 */
export const loadCoursesRequestSuccess = createAction(
  CoursesActionTypes.LoadCoursesRequestSuccess,
  props<{ courses: Course[] }>()
);


/**
 * Represent an Request Failure of Load a set of courses
 * // TODO type errors
 */
export const loadCoursesRequestFailure = createAction(
  CoursesActionTypes.LoadCoursesRequestFailure,
  props<{ errors: any[] }>()
);


/**
 * Represent an Request Failure of Load a set of courses
 * // TODO type errors
 */
export const changeListViewmode = createAction(
  CoursesActionTypes.ChangeListViewMode,
  props<{ viewMode: ListViewMode }>()
);

