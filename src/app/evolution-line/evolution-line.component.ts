import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { HistorySidebarComponent } from '../history-sidebar/history-sidebar.component';


@Component({
  selector: 'app-evolution-line',
  templateUrl: './evolution-line.component.html',
  styleUrls: ['./evolution-line.component.css'],

})
export class EvolutionLineComponent {
  constructor(private pokemonService: PokemonService) {
    this.obtener_linea("bulbasaur")
  }

  obtener_linea(nombre: string) {
    this.pokemonService.obtener_linea_evolutiva(nombre).then((data) => {
      // console.log(data);
      const container = document.getElementById('container');
      if (!container) return;

      container.innerHTML = '';

      data.forEach((evolutionStage, columnIndex) => {
        if (!Array.isArray(evolutionStage)) {
          console.error('evolutionStage is not an array:', evolutionStage);
          return;
        }

        let columnDiv = document.createElement('div');
        columnDiv.className = 'column';


        container.style.height = `${evolutionStage.length * 100}px`;

        evolutionStage.forEach((item: any, index: number) => {
          let newDiv = document.createElement('div');
          newDiv.id = `evolucion_${columnIndex}_${index}`;
          newDiv.style.display = 'none';

          let newImg = document.createElement('img');
          newDiv.appendChild(newImg);

          columnDiv.appendChild(newDiv);

          this.pokemonService.obtener_sprite(item).then((sprite) => {
            newImg.setAttribute("src", sprite);
            newDiv.style.display = 'block';
          });
        });

        container.appendChild(columnDiv);
      });
    });
  }
}
