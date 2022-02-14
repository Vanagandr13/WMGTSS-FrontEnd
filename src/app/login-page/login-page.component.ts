// External Imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

// Internal Imports
import { AuthenticationService } from '../services/authentication-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { 
      // Redirect to home if already logged in.
      if (this.authenticationService.userValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  getForm() { return this.loginForm; }

  onSubmit() {
      this.submitted = true;

      // Stop here if form is invalid.
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      try {
        // Send login details to the authentication service.
        this.authenticationService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      }
      catch (error) {
        this.error = error.message;
        this.loading = false;
        return;
      }

      // Get return url from query parameters or default to home page.
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);

  }
}

