import { Component, OnInit } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  PYTHAGOREAN_TREE_INDEX = 1;
  GENERATIVE_DESIGN_INDEX = 3;
  selectedGeneration: Number;

  constructor() {}

  ngOnInit(): void {}

  generationSelectChange(generationIndex) {
    this.selectedGeneration = generationIndex;
  }
}
