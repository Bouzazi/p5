import { Component, OnInit } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-image-from-equation',
  templateUrl: './image-from-equation.component.html',
  styleUrls: ['./image-from-equation.component.css'],
})
export class ImageFromEquationComponent implements OnInit {
  pointCount = 1000;
  lissajousPoints = [];
  freqX = 4;
  freqY = 7;
  phi = 15;

  modFreqX = 3;
  modFreqY = 2;
  lineWeight = 0.1;
  lineColor;
  lineColorValue = '#BBBBBB';
  lineAlpha = 50;

  connectionRadius = 100;
  connectionRamp = 6;

  canvas: any;

  constructor() {}

  ngOnInit(): void {
    const sketchConst = (s) => {
      function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
            }
          : null;
      }

      let calculateLissajousPoints = () => {
        for (var i = 0; i <= this.pointCount; i++) {
          var angle = s.map(i, 0, this.pointCount, 0, s.TAU);

          var x =
            s.sin(angle * this.freqX + s.radians(this.phi)) *
            s.cos(angle * this.modFreqX);
          var y = s.sin(angle * this.freqY) * s.cos(angle * this.modFreqY);
          x *= s.width / 2 - 30;
          y *= s.height / 2 - 30;

          this.lissajousPoints[i] = s.createVector(x, y);
        }
      };

      let drawLissajous = () => {
        s.background(255);
        s.strokeWeight(this.lineWeight);
        s.push();
        s.translate(s.width / 2, s.height / 2);

        for (var i1 = 0; i1 < this.pointCount; i1++) {
          for (var i2 = 0; i2 < i1; i2++) {
            var d = this.lissajousPoints[i1].dist(this.lissajousPoints[i2]);
            var a = s.pow(1 / (d / this.connectionRadius + 1), 6);
            if (d <= this.connectionRadius) {
              s.stroke(this.lineColor, a * this.lineAlpha);
              s.line(
                this.lissajousPoints[i1].x,
                this.lissajousPoints[i1].y,
                this.lissajousPoints[i2].x,
                this.lissajousPoints[i2].y
              );
            }
          }
        }
        s.pop();
      };

      s.setup = () => {
        let canvas = s.createCanvas(450, 450);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas.parent('sketch-holder');
        s.background(255);

        s.colorMode(s.RGB, 255, 255, 255, 100);
        s.noFill();

        let rgb = hexToRgb(this.lineColorValue);
        this.lineColor = s.color(rgb.r, rgb.g, rgb.b, this.lineAlpha);
      };

      s.draw = () => {
        let rgb = hexToRgb(this.lineColorValue);
        this.lineColor = s.color(rgb.r, rgb.g, rgb.b, this.lineAlpha);

        calculateLissajousPoints();
        drawLissajous();

        s.noLoop();
      };

      s.mouseReleased = () => {};

      s.keyPressed = () => {
        if (s.key == 'g') {
          s.loop();
        }
        /*if (s.key == '1') this.freqX--;
        if (s.key == '2') this.freqX++;
        this.freqX = s.max(this.freqX, 1);

        if (s.key == '3') this.freqY--;
        if (s.key == '4') this.freqY++;
        this.freqY = s.max(this.freqY, 1);

        if (s.keyCode == s.LEFT_ARROW) this.phi -= 15;
        if (s.keyCode == s.RIGHT_ARROW) this.phi += 15;

        if (s.key == '7') this.modFreqX--;
        if (s.key == '8') this.modFreqX++;
        this.modFreqX = s.max(this.modFreqX, 1);

        if (s.key == '9') this.modFreqY--;
        if (s.key == '0') this.modFreqY++;
        this.modFreqY = s.max(this.modFreqY, 1);

        calculateLissajousPoints();
        drawLissajous();*/

        console.log(
          'freqX: ' +
            this.freqX +
            ', freqY: ' +
            this.freqY +
            ', phi: ' +
            this.phi +
            ', modFreqX: ' +
            this.modFreqX +
            ', modFreqY: ' +
            this.modFreqY
        );
      };
    };

    this.canvas = new p5(sketchConst);
  }

  updateLineColor(newLineColor) {
    this.lineColorValue = newLineColor;
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
