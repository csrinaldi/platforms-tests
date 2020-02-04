import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Course} from "./domain/course";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("courses")
  getHello(): Course[] {

    return [
      <Course>{id: 1, name:"Angular", description:"Angular Course for Dummy"},
      <Course>{id: 2, name: "React", description: "React Course for Dummy"},
      <Course>{id: 3, name: "Vue", description: "Vue Course for Dummy"}
    ]

  }
}
