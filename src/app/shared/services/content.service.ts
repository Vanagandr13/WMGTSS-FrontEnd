import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
 })
export class ContentService {
  pages = {
    'home': {title: 'Home', subtitle: 'Welcome to the WMGTSS', content: 'Some home content.', image: ''},
    'module': {title: 'Module', subtitle: 'About Us', content: 'Some content about us.', image: ''},
    'datafileBoard': {title: 'Datafile Board', subtitle: '', content: 'datafile content', image: ''}
  };
}
