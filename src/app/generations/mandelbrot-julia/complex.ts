export class Complex {
  re: any;
  im: any;

  constructor(re, im) {
    this.re = re;
    this.im = im;
  }

  copy() {
    return new Complex(this.re, this.im);
  }

  conjugate() {
    return new Complex(this.re, -this.im);
  }

  add(c) {
    return new Complex(this.re + c.re, this.im + c.im);
  }

  addSelf(c) {
    this.re += c.re;
    this.im += c.im;
    return this;
  }

  sub(c) {
    return new Complex(this.re - c.re, this.im - c.im);
  }

  subSelf(c) {
    this.re -= c.re;
    this.im -= c.im;
    return this;
  }

  mult(c) {
    return new Complex(
      this.re * c.re - this.im * c.im,
      this.re * c.im + this.im * c.re
    );
  }

  multSelf(c) {
    let re = this.re * c.re - this.im * c.im;
    let im = this.re * c.im + this.im * c.re;
    this.re = re;
    this.im = im;
    return this;
  }

  div(c) {
    // X/Y = X . Y* . 1/|Y|² where |Y|² = Y.re² + Y.im²
    let d = this.mult(c.conjugate());
    let cMag2 = c.magSquared();
    return new Complex(d.re / cMag2, d.im / cMag2);
  }

  divSelf(c) {
    let cMag2 = c.magSquared();
    this.multSelf(c.conjugate());
    this.re /= cMag2;
    this.im /= cMag2;
    return this;
  }

  magnitude() {
    return Math.sqrt(this.magSquared());
  }

  magSquared() {
    return this.re ** 2 + this.im ** 2;
  }
}
