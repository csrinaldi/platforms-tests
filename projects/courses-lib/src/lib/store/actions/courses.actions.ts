import {createAction, props} from "@ngrx/store";
import {Course} from "../../model/course";

export enum CoursesActionTypes {
  LoadCoursesRequest = '[Courses] Load Courses Request',
  LoadCoursesRequestSuccess = '[Courses] Load Courses Request Success',
  // LoadCoursesRequestFailure = '[Courses] Load Courses Request Failure',
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
export const LoadCoursesRequestSuccess = createAction(
  CoursesActionTypes.LoadCoursesRequestSuccess,
  props<{courses: Course[]}>()
);
