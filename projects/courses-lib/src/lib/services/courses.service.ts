import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Course} from "../model/course";

const courses: Course[] = []



@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {
    courses.push(<Course>{ id: 1, name: 'Angular', description: 'Angular'});
  }

  public getAll(): Observable<Course[]>{

     return of(courses);

    //return this.http.get<Course[]>('/courses');
  }


}
