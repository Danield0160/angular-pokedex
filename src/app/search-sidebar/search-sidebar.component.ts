import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';

let pokeservice = new PokemonService()

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',

  providers:[PokemonService]
})


export class SearchSidebarComponent {
  searchTag() {
    let datos = pokeservice.obtener_todo()
    console.log(datos);
  }

}


  //   <h5>Buscar Pokémon:</h5>
  //   <input type="text" class="form-control" placeholder="Buscar Pokémon..."
  //     (keyup.enter)="searchTag()"
  //     #txtTagInput>
  // `,