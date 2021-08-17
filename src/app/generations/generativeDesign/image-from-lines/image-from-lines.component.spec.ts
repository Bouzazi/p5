import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFromLinesComponent } from './image-from-lines.component';

describe('ImageFromLinesComponent', () => {
  let component: ImageFromLinesComponent;
  let fixture: ComponentFixture<ImageFromLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFromLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFromLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
