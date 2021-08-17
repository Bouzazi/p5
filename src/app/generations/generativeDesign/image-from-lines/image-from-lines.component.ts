import { Component, OnInit } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-image-from-lines',
  templateUrl: './image-from-lines.component.html',
  styleUrls: ['./image-from-lines.component.css'],
})
export class ImageFromLinesComponent implements OnInit {
  canvas: any;
  drawMode = 1;
  img: any;
  disabled = false;

  constructor() {}

  ngOnInit(): void {
    const sketchConst = (s) => {
      s.preload = () => {
        this.img = s.loadImage('assets/pic.png');
      };

      s.setup = () => {
        let canvas = s.createCanvas(438, 447);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas.parent('sketch-holder');
        s.background(255);
      };

      s.draw = () => {
        //var mouseXFactor = s.map(s.mouseX, 0, s.width, 0.05, 1);
        //var mouseYFactor = s.map(s.mouseY, 0, s.height, 0.05, 1);

        let mouseXFactor = 0.1;
        let mouseYFactor = 0.1;

        console.log('Generation started' + this.drawMode);

        for (var gridX = 0; gridX < this.img.width; gridX++) {
          for (var gridY = 0; gridY < this.img.height; gridY++) {
            // grid position + tile size
            var tileWidth = s.width / this.img.width;
            var tileHeight = s.height / this.img.height;
            var posX = tileWidth * gridX;
            var posY = tileHeight * gridY;

            // get current color
            this.img.loadPixels();
            var c = s.color(this.img.get(gridX, gridY));
            // greyscale conversion
            var greyscale = s.round(
              s.red(c) * 0.222 + s.green(c) * 0.707 + s.blue(c) * 0.071
            );

            if (this.drawMode == 1) {
              // greyscale to stroke weight
              var w1 = s.map(greyscale, 0, 255, 15, 0.1);
              s.stroke(0);
              s.strokeWeight(w1 * mouseXFactor);
              s.line(posX, posY, posX + 5, posY + 5);
            } else if (this.drawMode == 2) {
              // greyscale to ellipse area
              s.fill(0);
              s.noStroke();
              var r2 =
                1.1284 * s.sqrt(tileWidth * tileWidth * (1 - greyscale / 255));
              r2 *= mouseXFactor * 3;
              s.ellipse(posX, posY, r2, r2);
            } else if (this.drawMode == 3) {
              // greyscale to line length
              var l3 = s.map(greyscale, 0, 255, 30, 0.1);
              l3 *= mouseXFactor;
              s.stroke(0);
              s.strokeWeight(10 * mouseYFactor);
              s.line(posX, posY, posX + l3, posY + l3);
            } else if (this.drawMode == 4) {
              // greyscale to rotation, line length and stroke weight
              s.stroke(0);
              var w4 = s.map(greyscale, 0, 255, 10, 0);
              s.strokeWeight(w4 * mouseXFactor + 0.1);
              var l4 = s.map(greyscale, 0, 255, 35, 0);
              l4 *= mouseYFactor;
              s.push();
              s.translate(posX, posY);
              s.rotate((greyscale / 255) * s.PI);
              s.line(0, 0, 0 + l4, 0 + l4);
              s.pop();
            } else if (this.drawMode == 5) {
              // greyscale to line relief
              var w5 = s.map(greyscale, 0, 255, 5, 0.2);
              s.strokeWeight(w5 * mouseYFactor + 0.1);
              // get neighbour pixel, limit it to image width
              var c2 = s.color(
                this.img.get(s.min(gridX + 1, this.img.width - 1), gridY)
              );
              s.stroke(c2);
              var greyscale2 = s.floor(
                s.red(c2) * 0.222 + s.green(c2) * 0.707 + s.blue(c2) * 0.071
              );
              var h5 = 50 * mouseXFactor;
              var d1 = s.map(greyscale, 0, 255, h5, 0);
              var d2 = s.map(greyscale2, 0, 255, h5, 0);
              s.line(posX - d1, posY + d1, posX + tileWidth - d2, posY + d2);
            } else if (this.drawMode == 6) {
              // pixel color to fill, greyscale to ellipse size
              var w6 = s.map(greyscale, 0, 255, 25, 0);
              s.noStroke();
              s.fill(c);
              s.ellipse(posX, posY, w6 * mouseXFactor, w6 * mouseXFactor);
            } else if (this.drawMode == 7) {
              s.stroke(c);
              var w7 = s.map(greyscale, 0, 255, 5, 0.1);
              s.strokeWeight(w7);
              s.fill(255, 255 * mouseXFactor);
              s.push();
              s.translate(posX, posY);
              s.rotate((greyscale / 255) * s.PI * mouseYFactor);
              s.rect(0, 0, 15, 15);
              s.pop();
            } else if (this.drawMode == 8) {
              s.noStroke();
              s.fill(greyscale, greyscale * mouseXFactor, 255 * mouseYFactor);
              s.rect(posX, posY, 3.5, 3.5);
              s.rect(posX + 4, posY, 3.5, 3.5);
              s.rect(posX, posY + 4, 3.5, 3.5);
              s.rect(posX + 4, posY + 4, 3.5, 3.5);
            } else if (this.drawMode == 9) {
              s.stroke(255, greyscale, 0);
              s.noFill();
              s.push();
              s.translate(posX, posY);
              s.rotate((greyscale / 255) * s.PI);
              s.strokeWeight(1);
              s.rect(0, 0, 15 * mouseXFactor, 15 * mouseYFactor);
              var w9 = s.map(greyscale, 0, 255, 15, 0.1);
              s.strokeWeight(w9);
              s.stroke(0, 70);
              s.ellipse(0, 0, 10, 5);
              s.pop();
            }
          }
        }

        console.log('Generation finisehd');
        s.noLoop();
      };

      s.mouseReleased = () => {};

      s.keyPressed = () => {
        if (s.key === 'g') {
          console.log(this.drawMode);
          s.clear();
          s.loop();
        }
      };
    };

    this.canvas = new p5(sketchConst);
  }

  drawModeSelect(newDrawMode) {
    this.drawMode = newDrawMode;
    console.log(this.drawMode);
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
