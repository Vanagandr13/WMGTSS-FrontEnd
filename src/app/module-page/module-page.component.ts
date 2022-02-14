// External Imports
import { Component, OnInit } from '@angular/core';
import { CoursePagesService } from '../services/course-pages-service';
import { ActivatedRoute } from '@angular/router';

// Internal Imports
import { Module } from '../models/course-data-types';

@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.css']
})
export class ModulePageComponent implements OnInit {
  moduleId: string = "";
  pageTitle: string = "";
  boardsData: {id: string, title: string}[] = [];

  constructor(private modulePageDataService: CoursePagesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Set up Routing.
    this.route.paramMap.subscribe(params => { 
      this.moduleId = params.get('moduleId') || ''; 
    }); 

    this.getPageData();
  }

  getPageData(): void { 
    const moduleObject: Module = this.modulePageDataService.getModule("DTS", this.moduleId);

    // Initialise values the display needs.
    this.pageTitle = moduleObject.displayTitle;

    for (const key in moduleObject.boards)
    {
      this.boardsData.push({id: key, title: moduleObject.boards[key]});
    }
  }

}
