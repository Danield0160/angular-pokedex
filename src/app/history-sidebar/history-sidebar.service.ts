import { Injectable } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokedexComponent } from '../pokedex/pokedex.component';
// import { EvolutionLineComponent } from '../evolution-line/evolution-line.component';

@Injectable({
  providedIn: 'root'
})
export class HistorySidebarService {

  private _taghistory: string[] = [];

  constructor(private pokedex: PokedexComponent, private pokemonService: PokemonService) { }

  get taghistory(): string[] {
    return [...this._taghistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._taghistory.includes(tag)) {
      this._taghistory = this._taghistory.filter((oldTag) => oldTag !== tag);
    }
    this._taghistory.unshift(tag);
    this._taghistory = this._taghistory.slice(0, 10);
  }

  searchTag(tag: string): void {

    if (tag.length === 0) {
      return;
    }

    this.organizeHistory(tag);
  }

  deleteTags(): void {
    this._taghistory = [];
  }

  recuperarTag(tag: any): void {
    this.pokedex.poner(this.pokemonService.obtener_id(tag.toLowerCase()));
    // this.linea.obtener_linea(tag);
  }
}
