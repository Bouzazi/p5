import { Component, OnInit } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-image-from-text',
  templateUrl: './image-from-text.component.html',
  styleUrls: ['./image-from-text.component.css'],
})
export class ImageFromTextComponent implements OnInit {
  canvas: any;
  fontSizeMax = 20;
  fontSizeMin = 10;
  spacing = 12; // line height
  kerning = 0.5; // between letters

  fontSizeStatic = false;
  blackAndWhite = false;

  img;

  generationText: string =
    "All the world's a stage, And all the men and women merely players; They have their exits and their entrances; And one man in his time plays many parts, His acts being seven ages. At first the infant, Mewling and puking in the nurse's arms; Then the whining school-boy, with his satchel And shining morning face, creeping like snail Unwillingly to school. And then the lover, Sighing like furnace, with a woeful ballad Made to his mistress' eyebrow. Then a soldier, Full of strange oaths, and bearded like the pard, Jealous in honour, sudden and quick in quarrel, Seeking the bubble reputation Even in the cannon's mouth. And then the justice, In fair round belly with good capon lin'd, With eyes severe and beard of formal cut, Full of wise saws and modern instances; And so he plays his part. The sixth age shifts Into the lean and slipper'd pantaloon, With spectacles on nose and pouch on side, His youthful hose, well sav'd, a world too wide For his shrunk shank; and his big manly voice, Turning again toward childish treble, pipes And whistles in his sound. Last scene of all, That ends this strange eventful history, Is second childishness and mere oblivion; Sans teeth, sans eyes, sans taste, sans every thing.";

  constructor() {}

  ngOnInit(): void {
    const sketchConst = (s) => {
      s.preload = () => {
        this.img = s.loadImage('assets/pic.png');
      };

      s.setup = () => {
        let canvas = s.createCanvas(450, 450);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas.parent('sketch-holder');
        s.background(255);
        s.textFont('Times');
        s.textSize(10);
        s.textAlign(s.LEFT, s.CENTER);
        s.print(this.img.width + ' • ' + this.img.height);
      };

      s.draw = () => {
        s.background(255);

        console.log('Generation strated');

        let x = 0;
        let y = 10;
        let counter = 0;

        while (y < s.height) {
          // translate position (display) to position (image)
          this.img.loadPixels();
          // get current color
          var imgX = s.round(s.map(x, 0, s.width, 0, this.img.width));
          var imgY = s.round(s.map(y, 0, s.height, 0, this.img.height));
          var c = s.color(this.img.get(imgX, imgY));
          var greyscale = s.round(
            s.red(c) * 0.222 + s.green(c) * 0.707 + s.blue(c) * 0.071
          );

          s.push();
          s.translate(x, y);

          if (this.fontSizeStatic) {
            s.textSize(this.fontSizeMax);
            if (this.blackAndWhite) {
              s.fill(greyscale);
            } else {
              s.fill(c);
            }
          } else {
            // greyscale to fontsize
            var fontSize = s.map(
              greyscale,
              0,
              255,
              this.fontSizeMax,
              this.fontSizeMin
            );
            fontSize = s.max(fontSize, 1);
            s.textSize(fontSize);
            if (s.blackAndWhite) {
              s.fill(0);
            } else {
              s.fill(c);
            }
          }

          var letter = this.generationText.charAt(counter);
          s.text(letter, 0, 0);
          var letterWidth = s.textWidth(letter) + this.kerning;
          // for the next letter ... x + letter width
          x += letterWidth;

          s.pop();

          // linebreaks
          if (x + letterWidth >= s.width) {
            x = 0;
            y += this.spacing;
          }

          counter++;
          if (counter >= this.generationText.length) {
            counter = 0;
          }
        }

        console.log('noLoop()');

        s.noLoop();
      };

      s.mouseReleased = () => {};

      s.keyPressed = () => {
        if (s.key === 'g') {
          console.log('Key pressed');

          s.loop();
        }
      };
    };

    this.canvas = new p5(sketchConst);
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
