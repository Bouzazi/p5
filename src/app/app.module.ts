import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { PythagorasTreeComponent } from './generations/pythagoras-tree/pythagoras-tree.component';
import { ImageFromTextComponent } from './generations/generativeDesign/image-from-text/image-from-text.component';
import { FormsModule } from '@angular/forms';
import { ImageFromLinesComponent } from './generations/generativeDesign/image-from-lines/image-from-lines.component';
import { ImageFromEquationComponent } from './generations/generativeDesign/image-from-equation/image-from-equation.component';
import { MandelbrotJuliaComponent } from './generations/mandelbrot-julia/mandelbrot-julia.component';
import { SierpinskiTriangleComponent } from './generations/sierpinski/sierpinski-triangle/sierpinski-triangle.component';
import { SierpinskiCarpetComponent } from './generations/sierpinski/sierpinski-carpet/sierpinski-carpet.component';
import { SierpinskiTetrahedronComponent } from './generations/sierpinski/sierpinski-tetrahedron/sierpinski-tetrahedron.component';
import { CircleComponent } from './generations/circle/circle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent,
    PythagorasTreeComponent,
    ImageFromTextComponent,
    ImageFromLinesComponent,
    ImageFromEquationComponent,
    MandelbrotJuliaComponent,
    SierpinskiTriangleComponent,
    SierpinskiCarpetComponent,
    SierpinskiTetrahedronComponent,
    CircleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
