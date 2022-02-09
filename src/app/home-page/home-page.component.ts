import { Component, OnInit } from '@angular/core';
import { CoursePagesService } from '../services/course-pages-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  ModulesData: {id: string, title: string}[] = [];


  constructor(private StudentService: CoursePagesService) {}

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData(): void {
    const courseObject = this.StudentService.getCourse("DTS");

    for (const key in courseObject.modules)
    {
      this.ModulesData.push({id: courseObject.modules[key].moduleId, title: courseObject.modules[key].displayTitle});
    }
  }
}
