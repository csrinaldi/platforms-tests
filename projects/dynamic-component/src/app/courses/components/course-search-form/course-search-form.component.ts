import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GenericSearchComponent} from '../../../commons/generic-search-component';

export class SearchData {
  public name: string;
}

export class CloseData {
  closes: boolean;
}

@Component({
  selector: 'app-course-search-form',
  templateUrl: './course-search-form.component.html',
  styleUrls: ['./course-search-form.component.scss']
})
export class CourseSearchFormComponent extends GenericSearchComponent<CloseData, SearchData> implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      name: [null, []],
      description: [null, []]
    });

  }

  onSubmit() {
    const searchData = new SearchData();
    searchData.name = this.formGroup.get('name').value;
    this.afterSearched.next(searchData);
  }

  onCancel() {
    const closeData = new CloseData();
    this.afterClosed.next(closeData);
  }

}
