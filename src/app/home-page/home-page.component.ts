import { AfterViewInit, Component, OnInit } from '@angular/core';

declare function getSnap(): any;
declare function downloadImage(): any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  PYTHAGOREAN_TREE_INDEX = 1;

  MANDELBROT_JULIA_INDEX = 2;

  SIERPINKSI_INDEX = 3;

  SIERPINKSI_TRIANGLE_INDEX = 1;
  SIERPINKSI_CARPET_INDEX = 2;
  SIERPINKSI_TETRAHEDRON_INDEX = 3;

  CIRCLE_INDEX = 4;

  GENERATIVE_DESIGN_INDEX = 5;

  IMAGE_FROM_TEXT_INDEX = 1;
  IMAGE_FROM_LINES_INDEX = 2;
  IMAGE_FROM_EQUATION_INDEX = 3;

  selectedGeneration: Number = 0;
  selectedGenerativeDesign: Number;
  selectedSierpinksi: Number;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  generationSelectChange(generationIndex) {
    this.selectedGeneration = generationIndex;
  }

  generativeDesignSelect(generativeDesignIndex) {
    this.selectedGenerativeDesign = generativeDesignIndex;
  }

  sierpinksiSelect(sierpinksiOption) {
    this.selectedSierpinksi = sierpinksiOption;
  }

  getSnapshot() {
    getSnap();
  }

  saveImage() {
    downloadImage();
  }
}
