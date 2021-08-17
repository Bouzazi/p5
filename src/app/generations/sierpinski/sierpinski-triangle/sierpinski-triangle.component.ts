import { Component, OnInit } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-sierpinski-triangle',
  templateUrl: './sierpinski-triangle.component.html',
  styleUrls: ['./sierpinski-triangle.component.css'],
})
export class SierpinskiTriangleComponent implements OnInit {
  canvas: any;
  fixedLen = 400;
  len = 200;

  constructor() {}

  ngOnInit(): void {
    const sketchConst = (s) => {
      function divide(x, y, l, lvl, max) {
        if (lvl == max) {
          tri(x, y, l);
        } else {
          divide(x, y, l / 2, lvl + 1, max);
          divide(x + l / 2, y, l / 2, lvl + 1, max);
          divide(x + l / 4, y - (l * s.sqrt(3)) / 4, l / 2, lvl + 1, max);
        }
      }

      function tri(x, y, l) {
        s.triangle(x, y, x + l / 2, y - (l * s.sqrt(3)) / 2, x + l, y);
      }

      s.setup = () => {
        let canvas = s.createCanvas(450, 450);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas.parent('sketch-holder');

        s.noStroke();
        s.fill(50);
      };

      s.draw = () => {
        s.background(255);
        divide(
          s.width / 2 - this.fixedLen / 2,
          s.height / 2 + (this.fixedLen * s.sqrt(3)) / 4,
          this.fixedLen,
          1,
          s.floor(s.map(this.len, 0, s.width, 1, 10))
        );
      };

      s.mouseReleased = () => {};

      s.mousePressed = () => {};

      s.keyPressed = () => {};
    };
    this.canvas = new p5(sketchConst);
  }

  updateLength(newLen) {
    this.len = newLen;
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
