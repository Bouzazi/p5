import { Component, OnInit } from '@angular/core';
import { Complex } from './complex';
import p5 from 'p5';
import chroma from 'chroma-js';

@Component({
  selector: 'app-mandelbrot-julia',
  templateUrl: './mandelbrot-julia.component.html',
  styleUrls: ['./mandelbrot-julia.component.css'],
})
export class MandelbrotJuliaComponent implements OnInit {
  canvas: any;
  toggle = false;
  stopped: boolean = false;
  color: any;
  ax: number = 0.99;
  ay: number = 0.91;
  az: number = 0.17;

  bx: number = 0.1;
  by: number = 0.5;
  bz: number = 0.88;

  cx: number = 1;
  cy: number = 1;
  cz: number = 1;

  dx: number = 0.8;
  dy: number = 0.5;
  dz: number = 0.2;
  constructor() {}

  ngOnInit(): void {
    // scales.procScale([0.56,1,1],[0.42,1,1],[0.39,0.4,1],[0.43,0.56,0.95])
    const sketchConst = (s) => {
      let a = { x: this.ax, y: this.ay, z: this.az };
      let b = { x: this.bx, y: this.by, z: this.bz };
      let c = { x: this.cx, y: this.cy, z: this.cz };
      let d = { x: this.dx, y: this.dy, z: this.dz };

      function palette(t) {
        // http://iquilezles.org/www/articles/palettes/palettes.htm
        // color(t) = a + b * cos[2π(c*t+d)]

        return {
          r: (a.x + b.x * s.cos(s.TWO_PI * (c.x * t + d.x))) * 255,
          g: (a.y + b.y * s.cos(s.TWO_PI * (c.y * t + d.y))) * 255,
          b: (a.z + b.z * s.cos(s.TWO_PI * (c.z * t + d.z))) * 255,
        };
      }

      function julia(Z, C) {
        let bright = 0;
        const maxIterations = 50;
        for (let n = 0; n <= maxIterations; n++) {
          Z.multSelf(Z.copy()).addSelf(C);

          if (Z.magSquared() > 16) break;

          bright = n / maxIterations;
        }
        return bright;
      }

      s.setup = () => {
        let canvas = s.createCanvas(450, 450);
        canvas.parent('sketch-holder');

        s.pixelDensity(1);
        s.background(0);
      };

      s.draw = () => {
        let C = new Complex(
          s.map(s.mouseX, 0, s.width, -2.5, 1),
          s.map(s.mouseY, 0, s.height, 1, -1)
        );

        s.loadPixels();
        for (let y = 0; y < s.height; y++) {
          for (let x = 0; x < s.width; x++) {
            let Z = new Complex(
              s.map(x, 0, s.width, -2.5, 1),
              s.map(y, 0, s.height, 1, -1)
            );
            if (this.toggle) C = Z.copy();

            let bright = julia(Z, C);
            const c = {
              r:
                (this.ax +
                  this.bx * s.cos(s.TWO_PI * (this.cx * bright + this.dx))) *
                255,
              g:
                (this.ay +
                  this.by * s.cos(s.TWO_PI * (this.cy * bright + this.dy))) *
                255,
              b:
                (this.az +
                  this.bz * s.cos(s.TWO_PI * (this.cz * bright + this.dz))) *
                255,
            };

            const index = (x + y * s.width) * 4;
            s.pixels[index] = c.r;
            s.pixels[index + 1] = c.g;
            s.pixels[index + 2] = c.b;
            s.pixels[index + 3] = 255;
          }
        }
        s.updatePixels();

        //s.noLoop();
      };

      s.mouseReleased = () => {};

      s.mousePressed = () => {
        //this.toggle = !this.toggle;
        //s.loop();
      };

      s.keyPressed = () => {
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

  ngOnDestroy() {
    this.canvas.remove();
  }
}
