import { Injectable } from '@angular/core';
let api_all_pokemon = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1400";
let api_base = "https://pokeapi.co/api/v2/"


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public listado_pokemon: any = [];
  public cargado;

  public pokemon: any = {}
  private pokemon_species: any = {}
  private DatosCargados = { pokemon: {}, pokemon_species: {} } //TODO
  private shiny: Array<String> = []
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
    if ((Math.random() * 100) < 1) {
      this.shiny.push(String(id))
      console.log(id)
    }

    let esto = this
    let promesa: Promise<any> = new Promise(function (resolve) {
      let interval = setInterval(function () {
        if (![undefined, ""].includes(esto.pokemon[id])) {
          clearInterval(interval)
          resolve(esto.pokemon[id])
        }
      }, 10)
    })

    if (this.pokemon[String(id)] == undefined) {
      this.pokemon[String(id)] = ""
      let funcion = async (id: any) => {
        let response = fetch(api_base + "pokemon/" + id)
        let pokemonData = (await response).json()
        this.pokemon[String(id)] = pokemonData
      }
      funcion(id)
    }
    return promesa
  }

  async cargar_datos_pokemon_species(id: any) {
    let esto = this
    let promesa: Promise<any> = new Promise(function (resolve) {
      let interval = setInterval(function () {
        if (![undefined, ""].includes(esto.pokemon_species[String(id)])) {
          clearInterval(interval)
          resolve(esto.pokemon_species[String(id)])
        }
      }, 10)
    })

    if (this.pokemon_species[String(id)] == undefined) {
      this.pokemon_species[String(id)] = ""
      let funcion = async (id: any) => {
        let response = fetch((await this.cargar_datos_pokemon(id)).species.url)
        let pokemonData = (await response).json()
        this.pokemon_species[String(id)] = pokemonData
      }
      funcion(id)
    }
    return promesa
  }



  async obtener_id(nombre: String) {
    let response = fetch(api_base + "pokemon/" + nombre)
    let pokemonData: any = await (await response).json()
    return pokemonData["id"]
  }

  async obtener_sprite(id: Number) {
    // let response = await fetch(api_base + "pokemon/" + id)
    let data = await this.cargar_datos_pokemon(id)
    let imagen
    if (this.shiny.includes(String(id))) {
      imagen = data["sprites"]["front_shiny"] ? data["sprites"]["front_shiny"] : "https://wikiwandv2-19431.kxcdn.com/_next/image?url=https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/MissingNo.svg/langsimple-640px-MissingNo.svg.png&w=640&q=50"
    } else {
      imagen = data["sprites"]["front_default"] ? data["sprites"]["front_default"] : "https://wikiwandv2-19431.kxcdn.com/_next/image?url=https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/MissingNo.svg/langsimple-640px-MissingNo.svg.png&w=640&q=50"
    }
    return imagen
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

  private tipos_traduccion: any = new Set()
  async obtener_tipos(id: Number) {
    let data = await this.cargar_datos_pokemon(id)
    let frase = ""
    for (const listado of data["types"]) {
      if (!this.tipos_traduccion[listado.type.name]) {
        let response_tipo = await fetch(listado.type.url)
        let datos = await response_tipo.json()
        let tipo = datos["names"][5]["name"];
        this.tipos_traduccion[listado.type.name] = tipo
      }
      frase += frase ? (" / " + this.tipos_traduccion[listado.type.name]) : (this.tipos_traduccion[listado.type.name])
    }
    return frase
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

  async obtener_descripcion(id: Number) {
    let data = await this.cargar_datos_pokemon_species(id);
    let descripcion = '';
    let description = '';

    for (let entry of data["flavor_text_entries"]) {
      if (entry["language"]["name"] == "es" && entry["version"]["name"] == "x") {
        descripcion = entry["flavor_text"];
      }
      if (entry["language"]["name"] == "en" && entry["version"]["name"] == "x") {
        description = entry["flavor_text"];
      }
    }

    if (!descripcion) {
      descripcion = description;
    }

    return descripcion;
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

    let id_poke = data2["chain"]["species"]["url"].split("/")
    let poke = id_poke[id_poke.length - 2]

    let array = [[poke]]; // Include the initial Pokemon
    let currentEvolutions = data2["chain"]["evolves_to"];
    while (currentEvolutions.length > 0) {
      let nextEvolutions = [];
      let currentStage = [];
      for (let evolution of currentEvolutions) {
        // currentStage.push(evolution["species"]["name"]);

        let url = evolution["species"]["url"].split("/")
        let poke = url[url.length - 2]

        currentStage.push(poke);
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

