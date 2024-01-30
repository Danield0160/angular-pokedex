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


  async obtener_ids(array_values:any){

    const array_ids = []
    for (let i = 0; i < array_values.length; i++) {
      let response = await fetch(api_base+"pokemon/"+array_values[i])
      let data = await response.json();
      array_ids.push(data["id"])
    }

    return array_ids
  }
  async obtener_linea_evolutiva(nombre:string){
    let array = []
    let tiene_primera_evolucion = await this.comprobar_si_tiene_primera_evolucion(nombre)

    if (tiene_primera_evolucion || array.push(nombre)) {
      let response = await fetch(api_base+"pokemon-species/"+nombre)
      let data = await response.json();
      let url = data["evolution_chain"]["url"]
      let response2 = await fetch(url)
      let data2 = await response2.json();

      if (tiene_primera_evolucion) {
        let preevolucion = data2["chain"]["species"]["name"]
        array.push(preevolucion)
      }

      let tiene_segunda_evolucion = await this.comprobar_si_tiene_segunda_evolucion(nombre)

      if (tiene_segunda_evolucion) {
        let segunda_evolucion = data2["chain"]["evolves_to"][0]["species"]["name"]
        array.push(segunda_evolucion)

        let tiene_tercera_evolucion = await this.comprobar_si_tiene_tercera_volucion(nombre)

        if (tiene_tercera_evolucion) {
          let tercera_evolucion = data2["chain"]["evolves_to"][0]["evolves_to"][0]["species"]["name"]
          array.push(tercera_evolucion)
        }
      }
    }

    return this.obtener_ids(array)
  }
  async comprobar_si_tiene_primera_evolucion(nombre:string){
    let response = await fetch(api_base+"pokemon/"+nombre)
    let data = await response.json();
    var nombre_pokemon = data["name"]
    let response2 = await fetch(api_base+"pokemon-species/"+nombre_pokemon)
    let data2 = await response2.json();
    if (data2["evolves_from_species"] == null){
      return false
    }
    return true
  }

  async comprobar_si_tiene_segunda_evolucion(nombre:string){
    let response = await fetch(api_base+"pokemon-species/"+nombre)
    let data = await response.json();
    let url = data["evolution_chain"]["url"]
    let response2 = await fetch(url)
    let data2 = await response2.json();
    if (data2["chain"]["evolves_to"].length == 0){
      return false
    }
    return true
  }

  async comprobar_si_tiene_tercera_volucion(nombre:string){
    let response = await fetch(api_base+"pokemon-species/"+nombre)
    let data = await response.json();
    let url = data["evolution_chain"]["url"]
    let response2 = await fetch(url)
    let data2 = await response2.json();
    if (data2["chain"]["evolves_to"][0]["evolves_to"].length == 0){
      return false
    }
    return true
  }
}

