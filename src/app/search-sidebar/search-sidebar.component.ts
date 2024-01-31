import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { ViewEncapsulation } from '@angular/core';
import { HistorySidebarService } from '../history-sidebar/history-sidebar.service';
import { EvolutionLineComponent } from '../evolution-line/evolution-line.component';


@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css'],
  providers: [PokedexComponent, EvolutionLineComponent],
  encapsulation: ViewEncapsulation.None
})


export class SearchSidebarComponent {
  constructor(private historySidebarService: HistorySidebarService, private pokemonService: PokemonService, private pokedexComponent: PokedexComponent, private evolutionLineComponent: EvolutionLineComponent) {
    this.pokemonService._obtener_todo().then((datos: any) => this.rellenar_listado(datos))
  }

  obtener() {
    this.pokemonService._obtener_todo().then((datos: any) => this.rellenar_listado(datos))
  }

  primeraAMayuscula(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  rellenar_listado(datos: any) {
    let listado = document.getElementById("pokedex_list")
    let i = 0
    for (const pokemon of datos) {
      i++
      let bloque = document.createElement("div")
      bloque.className = "pokemon"
      bloque.setAttribute("pokeid", String(i))

      let seccion_izq = document.createElement("div")
      let imagen = document.createElement("img")
      this.pokemonService.obtener_sprite(i).then((dato) => imagen.src = dato)
      seccion_izq.appendChild(imagen)

      let nombre = document.createElement("span")
      nombre.innerText = this.primeraAMayuscula(pokemon["name"])
      seccion_izq.appendChild(nombre)

      let seccion_der = document.createElement("div")
      seccion_der.innerText = "Nº " + i
      seccion_der.className = "search-sidebar_id_pokemon"
      bloque.appendChild(seccion_der)
      listado?.appendChild(bloque)
      bloque.appendChild(seccion_izq)

      bloque.onclick = (e: Event) => {
        let identification = (e.target! as HTMLTextAreaElement).getAttribute("pokeid")
        this.pokedexComponent.poner(identification)
        this.evolutionLineComponent.obtener_linea(String(identification));
      }

    }
  }

  searchTag(event: Event) {
    let entrada = (event.target as HTMLTextAreaElement).value.toLowerCase();
    this.historySidebarService.searchTag(entrada);
    this.evolutionLineComponent.obtener_linea(entrada);
    (event.target as HTMLTextAreaElement).value = "";
    this.pokedexComponent.poner(entrada);
    this.reset()
  }

  async busqueda(event: Event) {
    let hijos = document.getElementById("pokedex_list")!.children
    Array.from(hijos).forEach(element => {
      let div_texto = (element.children[1].children[1] as HTMLElement).innerText.toLowerCase();
      if (div_texto.includes((event.target as HTMLTextAreaElement).value.toLowerCase())) {
        (element as HTMLElement).style.display = "inline-block"
      } else {
        (element as HTMLElement).style.display = "none"
      }
    });
  }

  reset(){
    let hijos = document.getElementById("pokedex_list")!.children
    Array.from(hijos).forEach(element => {
        (element as HTMLElement).style.display = "inline-block"
    });
  }
}


