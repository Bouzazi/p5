import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SierpinskiTetrahedronComponent } from './sierpinski-tetrahedron.component';

describe('SierpinskiTetrahedronComponent', () => {
  let component: SierpinskiTetrahedronComponent;
  let fixture: ComponentFixture<SierpinskiTetrahedronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SierpinskiTetrahedronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SierpinskiTetrahedronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
