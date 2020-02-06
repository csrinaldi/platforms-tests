import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromCore from '../../core/store/reducers';
import {CoreState, loading} from '../../core/store/reducers';
import {select, Store} from '@ngrx/store';
import {Principal} from '../../core/domain/principal';
import {Router} from '@angular/router';
import {CourseReducer} from 'courses-lib';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';



@Component({
  selector: 's-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  principal$: Observable<Principal>;
  loadingCourses$: Observable<boolean>;
  loadingErrors$: Observable<any[]>;

  constructor(private store: Store<CoreState>, private router: Router) {}

  ngOnInit() {
    this.principal$ = this.store.pipe(select(fromCore.principal));
    this.loadingCourses$ = this.store.pipe(select(CourseReducer.loadingCourses));
    this.loadingErrors$ = this.store.pipe(select(CourseReducer.loadingErrors));
  }

  toCourses() {
    this.router.navigate(['courses'])
      .then((data) => {
        console.log('Ruteamos perfecto');
      })
      .catch((errors) => {
        console.log(errors);
      });
  }
}
