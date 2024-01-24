import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { EvolutionLineComponent } from './evolution-line/evolution-line.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PokedexComponent,
    EvolutionLineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
