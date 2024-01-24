import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private __taghistory:string[] = [];

  constructor() { }

  get tagHistory(){
    return[...this.__taghistory];
  }

  searchTag(tag:string){

}
