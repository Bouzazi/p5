import { Component, OnInit } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-sierpinski-carpet',
  templateUrl: './sierpinski-carpet.component.html',
  styleUrls: ['./sierpinski-carpet.component.css'],
})
export class SierpinskiCarpetComponent implements OnInit {
  canvas: any;
  sizeSetting = 200;

  constructor() {}

  ngOnInit(): void {
    const sketchConst = (s) => {
      function generateSierpinskiCarpet(size) {
        if (size > 4) {
          s.rect(0, 0, size, size);

          size /= 3;

          //Left
          s.push();
          s.translate(0 - size * 3 + size, 0 + size);
          s.rect(0, 0, size, size);
          generateSierpinskiCarpet(size);
          s.pop();

          //Right
          s.push();
          s.translate(0 + size * 5 - size, 0 + size);
          s.rect(0, 0, size, size);
          generateSierpinskiCarpet(size);
          s.pop();

          //Top
          s.push();
          s.translate(0 + size, 0 - size * 3 + size);
          s.rect(0, 0, size, size);
          generateSierpinskiCarpet(size);
          s.pop();

          //Bottom
          s.push();
          s.translate(0 + size, 0 + size * 5 - size);
          s.rect(0, 0, size, size);
          generateSierpinskiCarpet(size);
          s.pop();

          //Top Left
          s.push();
          s.translate(0 - size * 3 + size, 0 - size * 3 + size);
          s.rect(0, 0, size, size);
          generateSierpinskiCarpet(size);
          s.pop();

          //Top Right
          s.push();
          s.translate(0 + size * 5 - size, 0 - size * 3 + size);
          s.rect(0, 0, size, size);
          generateSierpinskiCarpet(size);
          s.pop();

          //Bottom Left
          s.push();
          s.translate(0 - size * 3 + size, 0 + size * 5 - size);
          s.rect(0, 0, size, size);
          generateSierpinskiCarpet(size);
          s.pop();

          //Bottom Right
          s.push();
          s.translate(0 + size * 5 - size, 0 + size * 5 - size);
          s.rect(0, 0, size, size);
          generateSierpinskiCarpet(size);
          s.pop();
        }
      }

      s.setup = () => {
        let canvas = s.createCanvas(450, 450);
        canvas.parent('sketch-holder');

        s.background(0);
        s.stroke(255);
        s.strokeWeight(1);
      };

      s.draw = () => {
        s.translate(
          s.width / 2 - this.sizeSetting / 2,
          s.height / 2 - this.sizeSetting / 2
        );
        generateSierpinskiCarpet(this.sizeSetting);

        s.noLoop();
      };

      s.mouseReleased = () => {};

      s.mousePressed = () => {};

      s.keyPressed = () => {
        if (s.key == 'g') {
          s.loop();
        }
      };
    };
    this.canvas = new p5(sketchConst);
  }

  updateSizeSetting(newSize) {
    this.sizeSetting = newSize;
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
