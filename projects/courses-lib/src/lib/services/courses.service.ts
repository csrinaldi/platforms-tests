import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Course[]>{
     return this.http.get<Course[]>("http://localhost:3000/courses")
  }


}
