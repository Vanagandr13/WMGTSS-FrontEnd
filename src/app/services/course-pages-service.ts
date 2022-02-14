// As this is a protoype of the real system, this services with dummy data course and module data

// In the eventual system, this service would interface with a WMGTSS Course Data Back-End. 
// The Back-End would provide the Front-End with course and module information. This allows for each course 
// to have differing modules without having to define a seperate page for each course/module.

// External Imports
import { Injectable } from '@angular/core';
import json from '../tests/mock-course-data.json';
import { BehaviorSubject, Observable } from 'rxjs';

// Internal Imports
import { Course, Module } from '../models/course-data-types';


@Injectable({
    providedIn: 'root',
})
export class CoursePagesService {
  private courseSubject: BehaviorSubject<Course>;
  public course: Observable<Course>;
  private moduleSubject: BehaviorSubject<Module>;
  public module: Observable<Module>;
  private CoursesData: Course[];

  constructor() {
    // Initialise observables.
    this.courseSubject = new BehaviorSubject<Course>(null);
    this.course = this.courseSubject.asObservable();

    this.moduleSubject = new BehaviorSubject<Module>(null);
    this.module = this.moduleSubject.asObservable();

    this.CoursesData = json.courses;
  }

  getCourse(courseId: string): Course {
    let course = this.CoursesData.find(x => x.courseId == courseId);
    this.courseSubject.next(course); // Update the observable.
    return course;
  }

  getModule(courseId: string, moduleId: string): Module {
    let course = this.CoursesData.find(x => x.courseId == courseId);
    let module = course.modules.find(x => x.moduleId == moduleId);
    this.moduleSubject.next(module); // Update the observable.
    return module;
  }
}