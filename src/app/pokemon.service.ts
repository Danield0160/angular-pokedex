import { Injectable } from '@angular/core';

let api_all_pokemon = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1305";
let someObj:Object;

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private _listado_pokemon: string[] = [];

  constructor() { }

  get listado_pokemon(){
    return[...this._listado_pokemon];
  }

  async cargar(){
    let datos
    await fetch(api_all_pokemon).then(response => response.json()).then(data => datos = data.results)

    console.log(datos![0]["name"])
  }

  prueba(){
    if (!this.listado_pokemon.length){
      this.cargar()
    }
  }

}

