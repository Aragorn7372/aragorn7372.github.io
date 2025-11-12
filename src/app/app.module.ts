import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule
    // NO añadir AppComponent aquí si es standalone
  ],
  providers: [],
  // NO bootstrapping desde aquí si usas bootstrapApplication
})
export class AppModule { }
