import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFromEquationComponent } from './image-from-equation.component';

describe('ImageFromEquationComponent', () => {
  let component: ImageFromEquationComponent;
  let fixture: ComponentFixture<ImageFromEquationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFromEquationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFromEquationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
