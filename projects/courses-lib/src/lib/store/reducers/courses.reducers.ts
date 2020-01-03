import {Course} from '../../model/course';
import {createReducer, on} from '@ngrx/store';
import {CourseActions} from '../actions';

export interface State {
  courses: Course[];
  loadingCourses: boolean;
}

const initialState: State = {
  courses: [],
  loadingCourses: false
};

export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCoursesRequest, (state) => ({...state, loadingCourses: true})),
  on(CourseActions.loadCoursesRequestSuccess, (state, {courses}) => ({...state, loadingCourses: false, courses}))
);
