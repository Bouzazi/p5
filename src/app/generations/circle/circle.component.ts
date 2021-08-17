import { Component, OnDestroy, OnInit } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'],
})
export class CircleComponent implements OnInit, OnDestroy {
  canvas: any;
  paused = false;
  loop = true;

  constructor() {}

  ngOnInit(): void {
    const sketchConst = (s) => {
      const maxGen = 2;
      var stems = 16;
      var maxWeight = 5;
      var brcount = 5;
      var lineSize = 0;
      var range = 0;
      var startRange = -390;

      function getPointAtAngle(cx, cy, radius, angle) {
        return s.createVector(
          cx + radius * s.cos(angle),
          cy + radius * s.sin(angle)
        );
      }

      function getAngle(x0, y0, x1, y1) {
        return s.atan2(y1 - y0, x1 - x0);
      }

      function drawLines(x0, y0, x1, y1, gen) {
        if (++gen <= maxGen) {
          var tars = new Array();
          var midA = getAngle(x0, y0, x1, y1);
          var angleStep = range / brcount;
          for (var i = 0; i <= brcount; i++) {
            var a = midA - range / 2 + i * angleStep;
            var tar = getPointAtAngle(x1, y1, lineSize, a);
            tars.push(tar);
            var weight = s.max(1, maxWeight - (gen * maxWeight) / maxGen);
            s.strokeWeight(weight);
            s.stroke(0, 0, 1);
            s.line(x1, y1, tar.x, tar.y);
          }
          for (var i = 0; i < tars.length; i++) {
            drawLines(x1, y1, tars[i].x, tars[i].y, gen);
          }
        }
      }

      s.setup = () => {
        let canvas = s.createCanvas(450, 450);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas.parent('sketch-holder');

        s.colorMode(s.HSB, 1, 1, 1, 1);

        console.log('Loaded');
      };

      s.draw = () => {
        s.background(0);
        lineSize = s.height / 6;
        var t = s.frameCount / 8;

        if (this.paused) {
          // Manual
          range = s.map(s.mouseX, 0, s.width, -s.TWO_PI * 2, s.TWO_PI * 2);
          s.stroke(0.5);
          s.fill(1);
          s.textSize(16);
          s.textAlign(s.CENTER, s.CENTER);
          s.text('manual control', s.width / 2, 16);
        } else {
          // Auto
          range = s.map(
            s.sin(s.radians(startRange + t)),
            -1,
            1,
            0,
            s.TWO_PI * 2
          );
        }

        var c = s.createVector(s.width / 2, s.height / 2);
        for (var ang = 0; ang < s.TWO_PI; ang += s.TWO_PI / stems) {
          var tar = getPointAtAngle(c.x, c.y, lineSize, ang);

          drawLines(c.x, c.y, tar.x, tar.y, 0);
        }
      };

      s.mouseReleased = () => {};

      s.mousePressed = () => {
        //paused = !paused;
      };

      s.keyPressed = () => {
        if (s.key == 'p') {
          if (this.loop) {
            this.loop = false;
            s.noLoop();
          } else {
            this.loop = true;
            s.loop();
          }
        }
      };
    };

    this.canvas = new p5(sketchConst);
  }

  updateType(newType) {
    if (newType == '0') this.paused = true;
    else this.paused = false;
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
