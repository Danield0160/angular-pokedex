import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private _taghistory: string[] = [];

  constructor() { }

  get tagHistory(){
    return[...this._taghistory];
  }

  searchTag(tag:string):void {
    this._taghistory.unshift(tag);
  }

}

