import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-pythagoras-tree',
  templateUrl: './pythagoras-tree.component.html',
  styleUrls: ['./pythagoras-tree.component.css'],
})
export class PythagorasTreeComponent implements OnInit {
  // Variables init
  size = 65;
  angleRight = 317;
  angleLeft = 42;
  iteration = 5;
  selectedShape = 2; // 1 Square, 2 Circle, 3 Rectangle
  selectedGenerationType = 0;
  backgroundColor = '#B8B8B8';
  generationColor = '#000000';

  canvas: any;

  constructor() {}

  ngOnInit(): void {
    const sketchConst = (s) => {
      // Calculates the number of iteration for a specific size
      let calculateIteration = (size, iteration) => {
        for (let index = 0; index < iteration; index++) {
          size *= 0.7;
        }
        return size;
      };

      // Pythagorean tree generation algorithm
      let pythagoreanTree = (nSize, angleA, angleB) => {
        if (nSize > calculateIteration(this.size, this.iteration)) {
          //Left Branch
          s.push();
          s.translate(-nSize / 2, -nSize / 2);
          s.rotate(angleA);

          if (this.selectedShape == 1) {
            s.rect(0, 0, nSize * 0.7, nSize * 0.7);
          } else {
            s.ellipse(0, 0, nSize * 0.7, nSize * 0.7);
          }

          pythagoreanTree(nSize * 0.7, angleA, angleB);
          s.pop();
          //Right Branch
          s.push();
          if (this.selectedShape == 1) {
            s.translate(nSize, -nSize);
          } else if (this.selectedShape == 2) {
            s.translate(nSize / 2, -nSize / 2);
          }

          s.rotate(angleB);

          if (this.selectedShape == 1) {
            s.rect(0, 0, nSize * 0.7, nSize * 0.7);
          } else {
            s.ellipse(0, 0, nSize * 0.7, nSize * 0.7);
          }
          pythagoreanTree(nSize * 0.7, angleA, angleB);
          s.pop();
        }
      };

      s.setup = () => {
        let canvas = s.createCanvas(450, 450);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas.parent('sketch-holder');
        s.background(this.backgroundColor);

        s.angleMode(s.DEGREES);
        s.noStroke();
      };

      s.draw = () => {
        s.background(this.backgroundColor);
        s.fill(this.generationColor);

        if (this.selectedShape == 1) {
          s.translate(s.width / 2 - this.size / 2, 270);
          s.rect(0, 0, this.size, this.size);
        } else if (this.selectedShape == 2) {
          s.translate(s.width / 2, 270);
          s.ellipse(0, 0, this.size, this.size);
        }

        pythagoreanTree(this.size, this.angleRight, this.angleLeft);
      };

      s.mouseReleased = () => {};

      s.keyPressed = () => {};
    };

    this.canvas = new p5(sketchConst);
  }

  updateBackgroundColor(newBackgroundColor) {
    this.backgroundColor = newBackgroundColor;
  }

  updateGenerationColor(newGenerationColor) {
    this.generationColor = newGenerationColor;
  }

  updateShape(newShape) {
    this.selectedShape = newShape;
  }

  updateIteration(newIterationValue) {
    this.iteration = newIterationValue;
  }

  updateSize(newSize) {
    this.size = newSize;
  }

  updateAngleRight(newAngle) {
    this.angleRight = newAngle;
  }

  updateAngleLeft(newAngle) {
    this.angleLeft = newAngle;
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
