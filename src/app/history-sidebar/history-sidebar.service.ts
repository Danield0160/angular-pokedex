import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistorySidebarService {

  private _taghistory: string[] = [];

  constructor() { }

  get taghistory(): string[] {
    return[...this._taghistory];
  }

  private organizeHistory(tag:string): void {
    tag = tag.toLowerCase();

    if (this._taghistory.includes(tag)) {
      this._taghistory = this._taghistory.filter( (oldTag) => oldTag !== tag);
    }
    this._taghistory.unshift(tag);
    this._taghistory = this._taghistory.slice(0, 10);
  }

  searchTag(tag: string): void {

    if(tag.length === 0) {
      return;
    }

    this.organizeHistory(tag);
  }

  deleteTags(): void {
    this._taghistory = [];
  }
}
