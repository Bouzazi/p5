import { Component, OnInit } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-sierpinski-tetrahedron',
  templateUrl: './sierpinski-tetrahedron.component.html',
  styleUrls: ['./sierpinski-tetrahedron.component.css'],
})
export class SierpinskiTetrahedronComponent implements OnInit {
  canvas: any;
  size = 35;
  rot = 0;
  stopped: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const sketchConst = (s) => {
      function createTetrahedron(size) {
        s.noStroke();
        s.fill(0, 255, 0, 160);

        if (size > 3) {
          s.sphere(size);

          size /= 2;

          //Top
          s.push();
          s.translate(0, -size * 5, 0);
          s.sphere(size);
          createTetrahedron(size);
          s.pop();

          //Left
          s.push();
          s.translate(-size * 4, size * 2, -size * 3);
          s.sphere(size);
          createTetrahedron(size);
          s.pop();

          //Right
          s.push();
          s.translate(size * 4, size * 2, -size * 3);
          s.sphere(size);
          createTetrahedron(size);
          s.pop();

          //Front
          s.push();
          s.translate(0, size * 2, size * 5);
          s.sphere(size);
          createTetrahedron(size);
          s.pop();
        }
      }

      s.setup = () => {
        let canvas = s.createCanvas(450, 450, s.WEBGL);
        canvas.parent('sketch-holder');

        s.angleMode(s.DEGREES);
      };

      s.draw = () => {
        s.background(0);
        s.rotateY(this.rot);
        this.rot += 2;
        createTetrahedron(this.size);
      };

      s.mouseReleased = () => {};

      s.mousePressed = () => {};

      s.keyPressed = () => {
        if (s.key == 's') {
          console.log('Saving..');
          s.saveCanvas();
        }

        if (s.key == 'p') {
          this.stopped = !this.stopped;
          if (this.stopped) {
            s.loop();
          } else {
            s.noLoop();
          }
        }
      };
    };
    this.canvas = new p5(sketchConst);
  }

  updateSize(newSize) {
    this.size = newSize;
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
