// Module Page Unit Tests

// External Imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router'

// Internal Imports
import { CoursePagesService } from '../services/course-pages-service';
import { ModulePageComponent } from './module-page.component';
import { MockActiveRouteService } from '../tests/mock-services';

const mockActivateRouteService = new MockActiveRouteService();
const mockCoursePagesService = new CoursePagesService();

mockCoursePagesService.getCourse("DTS");

describe('ModulePageComponent', () => {
  let component: ModulePageComponent;
  let fixture: ComponentFixture<ModulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulePageComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivateRouteService },
        { provide: CoursePagesService, useValue: mockCoursePagesService }
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
