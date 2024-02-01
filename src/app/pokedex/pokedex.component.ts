import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  constructor(private pokemonService: PokemonService) {
    this.poner(1)
  }

  poner(id: any) {
    this.poner_icono(id)
    this.poner_nombre(id)
    this.poner_tipos(id)
    this.poner_altura(id)
    this.poner_peso(id)
    this.poner_especie(id)
    this.poner_habitat(id)
    this.poner_id(id)
  }

  poner_icono(id: Number) {
    let respuesta = this.pokemonService.obtener_sprite(id)
    respuesta.then((data) => document.getElementById("icono")?.setAttribute("src", data))
  }

  poner_nombre(id: Number) {
    let respuesta = this.pokemonService.obtener_nombre(id)
    respuesta.then((data) => document.getElementById("pokedex_nombre_pokemon")!.innerText = data)
  }

  poner_tipos(id: Number) {
    let respuesta = this.pokemonService.obtener_tipos(id)
    respuesta.then((data: any) => {
      document.getElementById("pokedex_tipo_pokemon")!.innerText = data;
      //si el data tiene un / dividirlo en 2 strings que contengan los tipos, si no, poner el color del tipo
      if (data.includes("/")) {
        let tipos = data.split(" / ");
        document.getElementById("pokedex_tipo_pokemon")!.style.backgroundColor = this.color_tipo(tipos[0]);
        //degradado de tipo0 a tipo1
        document.getElementById("pokedex_tipo_pokemon")!.style.backgroundImage = "linear-gradient(to right, " + this.color_tipo(tipos[0]) + ", " + this.color_tipo(tipos[1]) + ")";
      }
      else {
        document.getElementById("pokedex_tipo_pokemon")!.style.backgroundImage = "none";
        document.getElementById("pokedex_tipo_pokemon")!.style.backgroundColor = this.color_tipo(data);
      }
    });
  }

  color_tipo(data: string) {

    let tipos = ["Fuego", "Agua", "Planta", "Eléctrico", "Normal", "Lucha", "Volador", "Veneno", "Tierra", "Roca", "Bicho", "Fantasma", "Acero", "Dragón", "Siniestro", "Hada", "Psíquico", "Hielo"]
    let colores = ["#F08030", "#6890F0", "#78C850", "#F8D030", "#A8A878", "#C03028", "#A890F0", "#A040A0", "#E0C068", "#B8A038", "#A8B820", "#705898", "#B8B8D0", "#7038F8", "#705848", "#EE99AC", "#F85888", "#98D8D8"]

    if (tipos.includes(data)) {
      for (let i = 0; i < tipos.length; i++) {
        if (tipos[i] == data) {
          return colores[i];
        }
      }
    }

    return "grey";
  }

  poner_altura(id: Number) {
    let respuesta = this.pokemonService.obtener_altura(id)
    respuesta.then((data) => document.getElementById("pokedex_altura_pokemon")!.innerText = (data / 10).toString() + ' m')
  }

  poner_peso(id: Number) {
    let respuesta = this.pokemonService.obtener_peso(id)
    respuesta.then((data) => document.getElementById("pokedex_peso_pokemon")!.innerText = (data / 10).toString() + ' kg')
  }

  poner_habitat(id: Number) {
    let respuesta = this.pokemonService.obtener_habitat(id)
    respuesta.then((data) => document.getElementById("pokedex_habitat_pokemon")!.innerText = data)
  }

  poner_id(id: Number) {
    function poner_texto(data: any) { document.getElementById("pokedex_id_pokemon")!.innerText = data };
    this.pokemonService.obtener_nombre(id).then((data) => poner_texto(id))
  }

  poner_especie(id: Number) {
    let respuesta = this.pokemonService.obtener_especie(id)
    respuesta.then((data) => document.getElementById("pokedex_especie_pokemon")!.innerText = data)
  }
}

