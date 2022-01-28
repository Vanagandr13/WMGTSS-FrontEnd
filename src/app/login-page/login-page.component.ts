import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
// app/page/page.component.ts

export class LoginPageComponent implements OnInit {
  page = {
    title: 'Home',
    subtitle: 'Welcome Home!',
    content: 'Some home content.',
    image: 'assets/MadagascarRocks.jpg'
  };

  constructor() { }

  ngOnInit() { }
}
