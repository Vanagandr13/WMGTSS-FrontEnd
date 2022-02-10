// As this is a protoype of the real system, this services with dummy data course and module data

// In the eventual system, this service would interface with the WMGTSS Back-End. 
// The Back-End would provide the Front-End with course and module information. This allows for each course 
// to have differing modules without having to define a seperate page for each module/board.

import { Injectable } from '@angular/core';
import json from '../../assets/course-data.json';
import { Course, Module } from '../models/course-data-types';

@Injectable({
    providedIn: 'root',
})
export class CoursePagesService {
  CoursesData: any = json.courses;

  constructor() {
  }

  getCourse(courseId: string): Course {
    return this.CoursesData[courseId];
  }

  getModule(courseId: string, moduleId: string): Module {
    return this.CoursesData[courseId].modules[moduleId];
  }
}