import { Component } from '@angular/core';
import { HistorySidebarService } from './history-sidebar.service';
import { PokedexComponent } from '../pokedex/pokedex.component';
//import { SearchSidebarComponent } from '../search-sidebar/search-sidebar.component';
import { EvolutionLineComponent } from '../evolution-line/evolution-line.component';
// import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-history-sidebar',
  templateUrl: './history-sidebar.component.html',
  styleUrls: ['./history-sidebar.component.css'],
  providers:[EvolutionLineComponent, PokedexComponent]

})
export class HistorySidebarComponent {

  constructor(private historySidebarService: HistorySidebarService, private evolutionLine:EvolutionLineComponent, private pokedex:PokedexComponent) { }

  get tags() {
    return this.historySidebarService.taghistory;
  }

  //haciendo uso del SearchSidebarComponent hacer que al clicar en un tag del historial se muestreen la pokedex

  deleteTags(): void {
    //en el button de html se llama a esta funcion
    this.historySidebarService.deleteTags();
  }

  recuperarTag(event:Event): void {
    //en el div de html se llama a esta funcion
    //el event es el tag que se ha clicado y contiene el div con el tag
    let tag = event.target as HTMLDivElement;
    let etiqueta = tag.innerText;
    //this.historySidebarService.recuperarTag(etiqueta);
    this.evolutionLine.obtener_linea(etiqueta);
    this.pokedex.poner(etiqueta)
  }

}

