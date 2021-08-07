import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythagorasTreeComponent } from './pythagoras-tree.component';

describe('PythagorasTreeComponent', () => {
  let component: PythagorasTreeComponent;
  let fixture: ComponentFixture<PythagorasTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PythagorasTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PythagorasTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
