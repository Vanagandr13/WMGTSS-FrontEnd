import { Component, OnInit } from '@angular/core';
import { CoursePagesService } from '../services/course-pages-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.css']
})
export class ModulePageComponent implements OnInit {
  moduleId: string = "";
  pageTitle: string = "";
  boardsData: {id: string, title: string}[] = [];

  constructor(private StudentService: CoursePagesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.moduleId = params.get('moduleId') || ''; 
    });
    
    this.getPageData();
  }

  getPageData(): void {
    const moduleObject = this.StudentService.getModule("DTS", this.moduleId);

    this.pageTitle = moduleObject.displayTitle;

    for (const key in moduleObject.boards)
    {
      this.boardsData.push({id: key, title: moduleObject.boards[key]});
    }
  }

}
