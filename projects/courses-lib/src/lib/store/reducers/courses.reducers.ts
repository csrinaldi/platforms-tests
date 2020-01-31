import {Course} from '../../model/course';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {CourseActions} from '../actions';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course>{
  // courses: Course[];
  loadingCourses: boolean;
  loaded: boolean;
}

export const adapter : EntityAdapter<Course> =
  createEntityAdapter<Course>({
    selectId: model => model.id
  });


/**
 *  // courses: [],
 *  // loadingCourses: false,
 *  // loaded: false
 */
const initialState: CoursesState =  adapter.getInitialState({
  loadingCourses: false,
  loaded: false
  });

export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCoursesRequest, (state) => ({...state, loadingCourses: true})),
  on(CourseActions.loadCoursesRequestSuccess, (state, {courses}) => (  adapter.addAll(courses, { ...state, loadingCourses: false, courses, loaded: true})))
);

export const coursesFeature = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

/*export const courses = createSelector(
  coursesFeature,
  (s1 => {
    console.log("Accediendo al courses", s1);
    return s1.courses
  })
);*/

export const loadingCourses = createSelector(
  coursesFeature,
  (s1 => s1.loadingCourses)
);

export const loaded = createSelector(
  coursesFeature,
  (s1 => s1.loaded)
);
