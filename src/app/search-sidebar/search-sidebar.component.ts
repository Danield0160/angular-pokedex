import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-sidebar',
  template: `
    <h5>Buscar Pokémon:</h5>
    <input type="text" class="form-control" placeholder="Buscar Pokémon..."
      (keyup.enter)="searchTag()"
      #txtTagInput>
  `,
  providers:[PokemonService]
})
export class SearchSidebarComponent {
  searchTag() {
    console.log(new PokemonService().prueba());
  }

}
