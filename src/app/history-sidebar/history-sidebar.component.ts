import { Component } from '@angular/core';
import { HistorySidebarService } from './history-sidebar.service';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { SearchSidebarComponent } from '../search-sidebar/search-sidebar.component';
// import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-history-sidebar',
  templateUrl: './history-sidebar.component.html',
  styleUrls: ['./history-sidebar.component.css'],

})
export class HistorySidebarComponent {

  constructor(private historySidebarService: HistorySidebarService) { }

  get tags(){
    return this.historySidebarService.taghistory;
  }

  //haciendo uso del SearchSidebarComponent hacer que al clicar en un tag del historial se muestreen la pokedex

  deleteTags(): void {
    //en el button de html se llama a esta funcion
    this.historySidebarService.deleteTags();
  }

}

