import {Course} from '../../model/course';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {CourseActions} from '../actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export enum ListViewMode {
  GRID,
  LIST
}

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course> {
  loadingCourses: boolean;
  loaded: boolean;
  listViewMode: ListViewMode
}

export const adapter: EntityAdapter<Course> =
  createEntityAdapter<Course>({
    selectId: course => course.id, // Not necessary id property is default name used by @ngrx/entity
    sortComparer: (a, b) => {
      const compare = a.id - b.id;
      if (compare > 0) {
        return 1;
      } else if (compare < 0) {
        return -1;
      } else {
        return 0;
      }
    }
  });

const initialState: CoursesState = adapter.getInitialState({
  loadingCourses: false,
  loaded: false,
  listViewMode: ListViewMode.LIST
});

export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCoursesRequest, (state) => ({...state, loadingCourses: true})),
  on(CourseActions.loadCoursesRequestSuccess, (state, {courses}) => (adapter.addAll(courses, {
    ...state,
    loadingCourses: false,
    loaded: true
  }))),
  on(CourseActions.changeListViewmode, (state, {viewMode}) => ({...state, listViewMode: viewMode})),
);

export const coursesFeature = createFeatureSelector<CoursesState>(coursesFeatureKey);

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors(coursesFeature);

/*export const courses = createSelector(
  coursesFeature,
  (s1 => {
    console.log("Accediendo al courses", s1);
    return s1.courses
  })
);*/

export const courses = selectAll;

export const loadingCourses = createSelector(
  coursesFeature,
  (s1 => s1.loadingCourses)
);

export const loaded = createSelector(
  coursesFeature,
  (s1 => s1.loaded)
);
