import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFromTextComponent } from './image-from-text.component';

describe('ImageFromTextComponent', () => {
  let component: ImageFromTextComponent;
  let fixture: ComponentFixture<ImageFromTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFromTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFromTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
