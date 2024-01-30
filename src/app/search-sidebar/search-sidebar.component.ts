import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { ViewEncapsulation } from '@angular/core';
import { HistorySidebarService } from '../history-sidebar/history-sidebar.service';


@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css'],
  providers:[PokemonService,PokedexComponent],
  encapsulation: ViewEncapsulation.None

})


export class SearchSidebarComponent {
  constructor(private historySidebarService: HistorySidebarService, private pokemonService: PokemonService, private pokedexComponent:PokedexComponent ) {
    this.pokemonService._obtener_todo().then((datos:any)=>this.rellenar_listado(datos))
  }


  obtener(){
    this.pokemonService._obtener_todo().then((datos:any)=>this.rellenar_listado(datos))
  }

  rellenar_listado(datos:any){
    let listado = document.getElementById("pokedex_list")
    let i = 0
    for (const pokemon of datos) {
      i++
      let bloque = document.createElement("div")
      bloque.className = "pokemon"
      bloque.setAttribute("pokeid",String(i))

      let seccion_izq = document.createElement("div")
      let imagen = document.createElement("img")
      this.pokemonService.obtener_sprite(i).then((dato)=>imagen.src = dato)
      seccion_izq.appendChild(imagen)

      let nombre = document.createElement("span")
      nombre.innerText = pokemon["name"]
      seccion_izq.appendChild(nombre)

      let seccion_der = document.createElement("div")
      seccion_der.innerText = "Nº" + i
      seccion_der.className = "search-sidebar_id_pokemon"
      bloque.appendChild(seccion_der)
      listado?.appendChild(bloque)
      bloque.appendChild(seccion_izq)

      bloque.onclick = (e:Event) =>{this.pokedexComponent.poner(( Number((e.target! as HTMLTextAreaElement).getAttribute("pokeid") )))}

    }
  }


  searchTag(event:Event) {
    let entrada = (event.target as HTMLTextAreaElement).value;
    this.historySidebarService.searchTag(entrada);
    (event.target as HTMLTextAreaElement).value = ""
    this.pokedexComponent.poner(Number(entrada))
  }

}