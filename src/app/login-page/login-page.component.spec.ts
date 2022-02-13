// External Imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Internal Imports
import { LoginPageComponent } from './login-page.component';
import { AuthenticationService } from '../services/authentication-service';
import { MockAuthService } from '../tests/mock-services';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  
  const mockAuthService = new MockAuthService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginPageComponent 
      ],
      imports: [ 
        ReactiveFormsModule
      ],
      providers:[
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: AuthenticationService, useValue: mockAuthService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
