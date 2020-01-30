import {Course} from '../../model/course';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {CourseActions} from '../actions';
import {layoutFeature} from "../../../../../ngrx-project/src/app/core/store/reducers";

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: Course[];
  loadingCourses: boolean;
}

const initialState: CoursesState = {
  courses: [],
  loadingCourses: false
};

export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCoursesRequest, (state) => ({...state, loadingCourses: true})),
  on(CourseActions.loadCoursesRequestSuccess, (state, {courses}) => ({...state, loadingCourses: false, courses}))
);

export const coursesFeature = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const courses = createSelector(
  coursesFeature,
  (s1 => s1.courses)
);

export const loadingCourses = createSelector(
  coursesFeature,
  (s1 => s1.loadingCourses)
);
