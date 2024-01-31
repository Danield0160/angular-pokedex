import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { EvolutionLineComponent } from './evolution-line/evolution-line.component';
import { HistorySidebarComponent } from './history-sidebar/history-sidebar.component';
import { SearchSidebarComponent } from './search-sidebar/search-sidebar.component';
import { PokemonService } from './pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    EvolutionLineComponent,
    HistorySidebarComponent,
    SearchSidebarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PokemonService, PokedexComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
