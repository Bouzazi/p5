import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandelbrotJuliaComponent } from './mandelbrot-julia.component';

describe('MandelbrotJuliaComponent', () => {
  let component: MandelbrotJuliaComponent;
  let fixture: ComponentFixture<MandelbrotJuliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandelbrotJuliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandelbrotJuliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
