import {Course} from "../../model/course";
import {CoursesActions, CoursesActionTypes} from "../actions/courses.actions";

export interface State {
  courses: Course[];
  loadingCourses: boolean
}

const initialState: State = {
  courses: [],
  loadingCourses: false
};

export function reducer(state = initialState, action: CoursesActions): State {
  switch (action.type) {
    case CoursesActionTypes.LoadCoursesRequest:
      return {
        ...state,

      }

    default:
      return state;
  }
}

function handleCourses(state: State, action: CoursesActions): State{
  return {
    ...state
    // allShips: action.payload
  };

}
