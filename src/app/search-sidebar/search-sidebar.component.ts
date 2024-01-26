import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';

let pokeservice = new PokemonService()

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css'],
  providers:[PokemonService]
})


export class SearchSidebarComponent {
  searchTag() {
    let datos = pokeservice.obtener_todo()
    // console.log(datos);
  }

}