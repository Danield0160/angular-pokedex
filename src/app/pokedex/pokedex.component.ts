import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';

let pokeservice= new PokemonService()

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  constructor(){
    this.poner(1)

  }
  poner(id:number){
    this.poner_icono(id)
    this.poner_nombre(id)
    this.poner_id(id)
  }

  poner_icono(id:Number){
    let respuesta = pokeservice.obtener_sprite(id)
    respuesta.then((data)=> document.getElementById("icono")?.setAttribute("src",data))
  }
  poner_nombre(id:Number){
    let respuesta = pokeservice.obtener_nombre(id)
    respuesta.then((data)=> function(data:any){document.getElementById("pokedex_nombre_pokemon")!.innerText = data}(data))
  }
  poner_id(id:Number){
    function poner_texto(data:any){document.getElementById("pokedex_id_pokemon")!.innerText = data};
    pokeservice.obtener_nombre(id).then((data)=> poner_texto(id))
  }
}

