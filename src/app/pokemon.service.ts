import { Injectable } from '@angular/core';

let api_all_pokemon = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1305";

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private listado_pokemon:any = [];

  constructor(){
    this.cargar()
  }
  
  async cargar(){
    console.log("cargando datos")
    const response = await fetch(api_all_pokemon);
    const data = await response.json();
    this.listado_pokemon = data.results;
  }

  obtener_todo(){
    return this.listado_pokemon
  }

  obtener_coincidencias_por_nombre(nombre:string){  }

  obtener_sprite(id:Number){  }

  obtener_descripcion(id:number){  }

  obtener_habitat(id:number){  }

  obtener_tipos(id:number){  }
}
