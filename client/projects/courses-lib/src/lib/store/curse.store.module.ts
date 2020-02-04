import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CoursesEffects} from './effects/courses.effects';
import {CourseReducer} from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('courses', CourseReducer.reducer),
    EffectsModule.forFeature([CoursesEffects])
  ],
  declarations: []
})
export class CourseStoreModule {
}
