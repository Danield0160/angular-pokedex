import { Injectable } from '@angular/core';

let api_all_pokemon = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025";
let api_base= "https://pokeapi.co/api/v2/"


@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private listado_pokemon:any = [];

  constructor(){
    this.__cargar()
  }

  async __cargar(){
    if (this.listado_pokemon.length > 0){
      return
    }
    let response = await fetch(api_all_pokemon);
    let data = await response.json();
    this.listado_pokemon = data.results;
  }
  //https://pokeapi.co/api/v2/pokemon-species/{nombre-del-pokémon}


  async _obtener_todo(){
    await this.__cargar()
    return this.listado_pokemon
  }

  obtener_coincidencias_por_nombre(nombre:string){  }

  async obtener_sprite(id:Number){
    let response = await fetch(api_base+"pokemon/"+id)
    let data = await response.json();
    return data["sprites"]["front_default"]
  }
  async obtener_nombre(id:Number){
    let response = await fetch(api_base+"pokemon/"+id)
    let data = await response.json();
    // console.log(data["name"])
    return data["name"]
  }

  obtener_descripcion(id:number){  }

  obtener_habitat(id:number){  }

  obtener_tipos(id:number){  }

  async obtener_altura(){
    let response = await fetch(api_base+"pokemon/"+"ditto")
    let data = await response.json();
    // console.log(data["species"])
    return data["species"];
  }
}

