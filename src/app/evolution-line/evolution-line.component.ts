import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';


@Component({
  selector: 'app-evolution-line',
  templateUrl: './evolution-line.component.html',
  styleUrls: ['./evolution-line.component.css'],
  providers:[PokemonService]
})
export class EvolutionLineComponent {
  constructor(private pokemonService:PokemonService){
    this.obtener_linea("venonat")
    this.obtener_linea("4")
  }

  obtener_linea(nombre:string){
    this.pokemonService.obtener_linea_evolutiva(nombre).then((data) => {
      console.log(data);
      const evolutions = ["primera_evolucion", "segunda_evolucion", "tercera_evolucion"];

      evolutions.forEach((evolution) => {
        let element = document.getElementById(evolution);
        if (element?.parentElement) {
          element.parentElement.style.display = 'none';
        }
      });

      data.forEach((item, index) => {
        if (index < 3) {
          this.pokemonService.obtener_sprite(item).then((sprite) => {
            let element = document.getElementById(evolutions[index]);
            if (element && element.parentElement) {
              element.setAttribute("src", sprite);
              element.parentElement.style.display = 'block';
            }
          });
        }
      });
    });

  }

}
