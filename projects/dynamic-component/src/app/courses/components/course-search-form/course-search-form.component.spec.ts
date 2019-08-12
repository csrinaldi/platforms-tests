import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchFormComponent } from './course-search-form.component';

describe('CourseSearchFormComponent', () => {
  let component: CourseSearchFormComponent;
  let fixture: ComponentFixture<CourseSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
