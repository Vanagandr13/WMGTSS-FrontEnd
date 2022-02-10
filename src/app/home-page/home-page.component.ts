import { Component, OnInit } from '@angular/core';
//import internal from 'stream';
import { CoursePagesService } from '../services/course-pages-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  ModulesData: {id: string, title: string, icon: string}[][] = [];
  ModulesPerRow: number = 3;
  IconList = ['maths','programming', 'businessManagement', 'networking']


  constructor(private StudentService: CoursePagesService) {}

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData(): void {
    const courseObject = this.StudentService.getCourse("DTS");

    let rowCounter: number = 0;
    let columnCounter: number = 0;

    for (const key in courseObject.modules)
    {
      if (columnCounter >= this.ModulesPerRow)
      {
        columnCounter = 0;
        rowCounter++;
      }
      this.ModulesData[columnCounter].push({id: courseObject.modules[key].moduleId, 
                                            title: courseObject.modules[key].displayTitle, 
                                            icon: courseObject.modules[key].icon});

      columnCounter++;                       
    }
  }

  getModuleIcon(iconName: string): string {
    if(this.IconList.indexOf(iconName) > -1)
    {
      return '../../assets/images/' + iconName + 'Icon.jpg'
    }
    else
    {
      return '../../assets/images/moduleIcon.jpg' // use default image if the module doesn't have a valid icon
    }
  }
}
