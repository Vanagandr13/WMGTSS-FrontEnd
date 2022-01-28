import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from '@angular/router';

import { ContentService } from '../shared/services/content.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [ContentService],
})

export class PageComponent implements OnInit {
  page = {
    title: 'Home',
    subtitle: 'Welcome Home!',
    content: 'Some home content.',
    image: 'assets/MadagascarRocks.jpg'
  };

  constructor(private route: ActivatedRoute,
              public contentService: ContentService) { }

  ngOnInit() {
    const pageData = this.route.snapshot.data['page'];
    /*
    this.page.title    = this.contentService.pages[pageData].title;
    this.page.subtitle = this.contentService.pages[pageData].subtitle;
    this.page.content  = this.contentService.pages[pageData].content;
    this.page.image    = this.contentService.pages[pageData].image;
    */
  }
}
