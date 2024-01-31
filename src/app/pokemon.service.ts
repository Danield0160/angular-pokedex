import { Injectable } from '@angular/core';
let api_all_pokemon = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025";
let api_base = "https://pokeapi.co/api/v2/"


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public listado_pokemon: any = [];
  public cargado;

  public pokemon: any = {}
  private pokemon_species: any = {}

  constructor() {
    this.cargado = this.__cargar()
  }

  async __cargar() {
    if (this.listado_pokemon.length > 0) {
      return
    }
    let response = await fetch(api_all_pokemon);
    let data = await response.json();
    this.listado_pokemon = data.results;

  }
  //https://pokeapi.co/api/v2/pokemon-species/{nombre-del-pokémon}


  async _obtener_todo() {
    await this.cargado

    return this.listado_pokemon
  }




  async cargar_datos_pokemon(id: any) {
    if (!this.pokemon[String(id)]) {
      let response = fetch(api_base + "pokemon/" + id)
      let pokemonData = (await response).json()
      this.pokemon[String(id)] = pokemonData
    }
    return await this.pokemon[String(id)]
  }
  //? hacer que sea una lista con el primer elemento una promesa?
  async cargar_datos_pokemon_species(id: any) {
    if (!this.pokemon_species[String(id)]) {
      let response = fetch(api_base + "pokemon-species/" + id)
      let pokemonData = (await response).json()
      this.pokemon_species[String(id)] = pokemonData
    }
    // console.log(await this.pokemon_species[String(id)])
    return await this.pokemon_species[String(id)]
  }

  // private loadingLocks: { [key: string]: Promise<void> } = {};
  // async cargar_datos_pokemon_species(id: any) {
  //   if (!this.pokemon_species[String(id)]) {
  //     // Verificar si ya hay una solicitud en curso para este id
  //     if (!this.loadingLocks[String(id)]) {
  //       // Crear una promesa para bloquear futuras solicitudes mientras esta se está realizando
  //       this.loadingLocks[String(id)] = new Promise(async (resolve) => {
  //         let response = await fetch(api_base + "pokemon-species/" + id);
  //         let pokemonData = await response.json();
  //         this.pokemon_species[String(id)] = pokemonData;
  //         // Liberar el bloqueo cuando la solicitud se completa
  //         delete this.loadingLocks[String(id)];
  //         resolve();
  //       });
  //     }
  //     // Esperar hasta que la solicitud anterior se complete antes de continuar
  //     await this.loadingLocks[String(id)];
  //   }
  //   return this.pokemon_species[String(id)];
  // }




  async obtener_sprite(id: Number) {
    // let response = await fetch(api_base + "pokemon/" + id)
    let data = await this.cargar_datos_pokemon(id)
    return data!["sprites"]["front_default"]
  }

  async obtener_nombre(id: Number) {
    // let response = await fetch(api_base + "pokemon/" + id)
    let data = await this.cargar_datos_pokemon(id)
    return this.primeraAMayuscula(data["name"])
  }

  private biomas: any = { "cave": "cueva", "forest": "bosque", "grassland": "pradera", "mountain": "montaña", "rare": "raro", "rough-terrain": "campo", "sea": "mar", "urban": "ciudad", "waters-edge": "agua salada" }
  async obtener_habitat(id: Number) {
    // let response = await fetch(api_base + "pokemon-species/" + id)
    let data = await this.cargar_datos_pokemon_species(id)

    let habitat_name
    if (data["habitat"] != undefined) {
      habitat_name = this.biomas[data["habitat"]["name"]]
    } else {
      habitat_name = "desconocido"
    }

    // let habitat = data["habitat"]["url"]
    // let habitat_id = habitat.split("/")[6]
    // let response2 = await fetch(api_base + "pokemon-habitat/" + habitat_id)
    // let data2 = await response2.json();
    // let habitat_name = data2["names"][1]["name"]
    return this.primeraAMayuscula(habitat_name)
  }

  async obtener_peso(id: Number) {
    // let response = await fetch(api_base + "pokemon/" + id)
    let data = await this.cargar_datos_pokemon(id)
    return data!["weight"]
  }

  async obtener_tipos(id: Number) {
    // let response = await fetch(api_base + "pokemon/" + id)
    let data = await this.cargar_datos_pokemon(id)
    if ((data["types"] as Array<String>).length === 1) {
      let tipo_url = data["types"][0]["type"]["url"];
      let response_tipo = await fetch(tipo_url);
      let data_tipo = await response_tipo.json();
      let tipo = data_tipo["names"][5]["name"];
      return this.primeraAMayuscula(tipo);

    } else {

      let tipo_1_url = data["types"][0]["type"]["url"];
      let tipo_2_url = data["types"][1]["type"]["url"];

      let response_tipo_1 = await fetch(tipo_1_url);
      let response_tipo_2 = await fetch(tipo_2_url);

      let data_tipo_1 = await response_tipo_1.json();
      let data_tipo_2 = await response_tipo_2.json();

      let tipo_1 = data_tipo_1["names"][5]["name"];
      let tipo_2 = data_tipo_2["names"][5]["name"];

      return this.primeraAMayuscula(tipo_1) + " / " + this.primeraAMayuscula(tipo_2);
    }
  }

  primeraAMayuscula(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async obtener_forma(id: Number) {
    // let response = await fetch(api_base + "pokemon-species/" + id)
    let data = await this.cargar_datos_pokemon_species(id)
    return data["shape"]["name"];
  }

  async obtener_especie(id: Number) {
    // let response = await fetch(api_base + "pokemon-species/" + id)
    let data = await this.cargar_datos_pokemon_species(id)
    let dato
    let i = 0
    for (const lenguaje of [...data["genera"]]) {
      if (lenguaje["language"]["name"] == "es") {
        dato = lenguaje["genus"]
        break
      }
      if (lenguaje["language"]["name"] == "en") {
        dato = lenguaje["genus"]
      }
      i++
    }
    return dato
  }

  async obtener_altura(id: Number) {
    // let response = await fetch(api_base + "pokemon/" + id)
    let data = await this.cargar_datos_pokemon(id)
    return data!["height"];
  }


  async obtener_ids(array_values: any) {

    const array_ids = []
    for (let i = 0; i < array_values.length; i++) {
      let response = await fetch(api_base + "pokemon/" + array_values[i])
      let data = await response.json();
      array_ids.push(data["id"])
    }

    return array_ids
  }

  async obtener_linea_evolutiva(nombre: string) {
    // let response = await fetch(api_base + "pokemon-species/" + id)
    let data = await this.cargar_datos_pokemon_species(nombre)
    let url = data["evolution_chain"]["url"]
    let response2 = await fetch(url)
    let data2 = await response2.json();

    let array = [[data2["chain"]["species"]["name"]]]; // Include the initial Pokemon
    let currentEvolutions = data2["chain"]["evolves_to"];
    while (currentEvolutions.length > 0) {
      let nextEvolutions = [];
      let currentStage = [];
      for (let evolution of currentEvolutions) {
        currentStage.push(evolution["species"]["name"]);
        nextEvolutions.push(...evolution["evolves_to"]);
      }
      array.push(currentStage);
      currentEvolutions = nextEvolutions;
    }

    // ya la api acepta tambien el nombre, no hace falta esta parte, ademas de que puedes conseguir la id, con la anterior llamada
    // // Convert each evolution stage to its corresponding id
    // for (let i = 0; i < array.length; i++) {
    //   array[i] = await this.obtener_ids(array[i]);
    // }

    return array;
  }


}

