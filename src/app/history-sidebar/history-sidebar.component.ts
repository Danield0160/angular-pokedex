import { Component } from '@angular/core';
import { HistorySidebarService } from './history-sidebar.service';
import { ViewEncapsulation } from '@angular/core';

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



  deleteTags(): void {
    //en el button de html se llama a esta funcion
    this.historySidebarService.deleteTags();
  }

}
