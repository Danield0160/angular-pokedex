import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { ViewEncapsulation } from '@angular/core';

let pokeservice = new PokemonService()
let pokedex = new PokedexComponent()

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css'],
  providers:[PokemonService],
  encapsulation: ViewEncapsulation.None

})


export class SearchSidebarComponent {
  constructor(){
    pokeservice._obtener_todo().then((datos:any)=>this.rellenar_listado(datos))
  }


  obtener(){
    pokeservice._obtener_todo().then((datos:any)=>this.rellenar_listado(datos))
  }

  rellenar_listado(datos:any){
    let listado = document.getElementById("pokedex_list")
    let i = 0
    for (const pokemon of datos) {
      i++
      let bloque = document.createElement("div")
      bloque.className = "pokemon_id"
      bloque.setAttribute("pokeid",String(i))

      let imagen = document.createElement("img")
      pokeservice.obtener_sprite(i).then((dato)=>imagen.src = dato)
      let nombre = document.createElement("span")
      nombre.innerText = pokemon["name"]

      listado?.appendChild(bloque)
      bloque.appendChild(imagen)
      bloque.appendChild(nombre)
      bloque.onclick = function(e:Event){pokedex.poner(( Number((e.target! as HTMLTextAreaElement).getAttribute("pokeid") )))}

    }
  }


  searchTag(event:Event) {
    let entrada = (event.target as HTMLTextAreaElement).value;
    (event.target as HTMLTextAreaElement).value = ""
    pokedex.poner(Number(entrada))
  }

}